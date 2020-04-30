import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { ChromeMessageMultiplexerService } from '@composite-library/lib/chrome/message-multiplexer/chrome-message-multiplexer.service';
import { ChromeMessageType } from '@composite-library/lib/chrome/message-multiplexer/model/message-type';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteCacheService } from './note-cache.service';
import Tab = chrome.tabs.Tab;

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteCacheService],
})
export class AppComponent {

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private noteDomainService: NoteDomainService,
    private chromeMessageMultiplexerService: ChromeMessageMultiplexerService,
    private noteCacheService: NoteCacheService,
  ) {
    console.log('Browser Extension Background is running');
    this.noteCacheService.start();

    this.listenForActiveTabChange();
    this.listenForUrlChangeOnActiveTab();
    this.listenForNoteUpdateFromExtension();
  }


  private listenForActiveTabChange() {
    this.chromeApiBridgeService.onTabActivated()
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
      )
      .subscribe(tab => {
        if (this.noteCacheService.isInCache(tab.url)) {
          this.setNoteSavedStatus(tab);
        } else {
          this.setNoteUnsavedStatus(tab);
        }
      });
  }

  private listenForUrlChangeOnActiveTab() {
    this.chromeApiBridgeService.onTabUpdated()
      .pipe(
        filter(event => event.tab.status === 'complete'),
        pluck('tab'),
      )
      .subscribe(tab => {
        if (this.noteCacheService.isInCache(tab.url)) {
          this.setNoteSavedStatus(tab);
        } else {
          this.setNoteUnsavedStatus(tab);
        }
      });
  }

  private listenForNoteUpdateFromExtension() {
    this.chromeMessageMultiplexerService.listenMessage(ChromeMessageType.NOTE_CREATED)
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
      )
      .subscribe(tab => this.setNoteSavedStatus(tab));

    this.chromeMessageMultiplexerService.listenMessage(ChromeMessageType.NOTE_DELETED)
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
      )
      .subscribe(tab => this.setNoteUnsavedStatus(tab));
  }

  private setNoteSavedStatus(tab: Tab) {
    this.chromeApiBridgeService.setBadgeText({
      tabId: tab.id,
      text: '✓',
    });
    this.chromeApiBridgeService.setBadgeBackgroundColor({
      tabId: tab.id,
      color: '#006100',
    });
  }

  private setNoteUnsavedStatus(tab: Tab) {
    this.chromeApiBridgeService.setBadgeText({
      text: '',
      tabId: tab.id,
    });
  }
}
