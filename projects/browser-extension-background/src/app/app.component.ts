import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { MyDataDomainService } from '@domain/entity/user/service/my-data-domain.service';
import { forkJoin } from 'rxjs';
import { ChromeMessageMultiplexerService } from '@composite-library/lib/chrome/message-multiplexer/chrome-message-multiplexer.service';
import { ChromeMessageType } from '@composite-library/lib/chrome/message-multiplexer/model/message-type';
import Tab = chrome.tabs.Tab;

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private myDataDomainService: MyDataDomainService,
    private chromeMessageMultiplexerService: ChromeMessageMultiplexerService,
  ) {
    console.log('Browser Extension Background is running');

    this.listenForPopupMessages();
    this.listenForActiveTab();

  }

  private listenForActiveTab() {
    this.chromeApiBridgeService.onTabActivated()
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
        switchMap(tab =>
          this.myDataDomainService.readMyNotesList({
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
    forkJoin([
      this.chromeApiBridgeService.setBadgeText({
        tabId: tab.id,
        text: '✓',
      }),
      this.chromeApiBridgeService.setBadgeBackgroundColor({
        tabId: tab.id,
        color: '#006100',
      }),
    ])
      .subscribe();
  }

  private setNoteUnsavedStatus(tab: Tab) {
    this.chromeApiBridgeService.setBadgeText({
      text: '',
      tabId: tab.id,
    })
      .subscribe();
  }
}
