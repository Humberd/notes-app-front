import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { ChromeMessageMultiplexerService } from '@composite-library/lib/chrome/message-multiplexer/chrome-message-multiplexer.service';
import { ChromeMessageType } from '@composite-library/lib/chrome/message-multiplexer/model/message-type';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import Tab = chrome.tabs.Tab;

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private noteDomainService: NoteDomainService,
    private chromeMessageMultiplexerService: ChromeMessageMultiplexerService,
  ) {
    console.log('Browser Extension Background is running');

    this.listenForActiveTab();
    this.listenForTabUpdate();
    this.listenForPopupMessages();
  }

  private listenForActiveTab() {
    this.chromeApiBridgeService.onTabActivated()
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
        switchMap(tab =>
          this.noteDomainService.readList({
            url: tab.url,
          })
            .pipe(
              map(notes => ({tab, notes})),
            ),
        ),
      )
      .subscribe(({tab, notes}) => {
        if (notes.data.length !== 0) {
          this.setNoteSavedStatus(tab);
        } else {
          this.setNoteUnsavedStatus(tab);
        }
      });
  }

  private listenForTabUpdate() {
    this.chromeApiBridgeService.onTabUpdated()
      .pipe(
        filter(event => event.tab.status === 'complete'),
        switchMap(event =>
          this.noteDomainService.readList({
            url: event.tab.url,
          })
            .pipe(
              map(notes => ({tab: event.tab, notes})),
            ),
        ),
      )
      .subscribe(({tab, notes}) => {
        if (notes.data.length !== 0) {
          this.setNoteSavedStatus(tab);
        } else {
          this.setNoteUnsavedStatus(tab);
        }
      });
  }

  private listenForPopupMessages() {
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
