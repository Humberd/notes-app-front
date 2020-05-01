import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { ChromeInternalMessageService } from '@composite-library/lib/chrome/internal-message/chrome-internal-message.service';
import { ChromeInternalMessageType } from '@composite-library/lib/chrome/internal-message/model/internal-message-type';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteCacheService } from './note-cache.service';
import { ChromeExternalMessageService } from '@composite-library/lib/chrome/external-message/chrome-external-message.service';
import { ChromeExternalMessageType } from '@composite-library/lib/chrome/external-message/model/external-message-type';
import { StorageService } from '@composite-library/lib/storage/storage.service';
import { StorageKey } from '@composite-library/lib/storage/storage-key';
import Tab = chrome.tabs.Tab;

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteCacheService],
})
export class AppComponent {
  readonly jwtStorageInstance = this.storageService.get(StorageKey.USER_JWT);

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private noteDomainService: NoteDomainService,
    private chromeInternalMessageService: ChromeInternalMessageService,
    private chromeExternalMessageService: ChromeExternalMessageService,
    private noteCacheService: NoteCacheService,
    private storageService: StorageService,
  ) {
    console.log('Browser Extension Background is running');
    this.noteCacheService.start();

    this.listenForCacheChange();
    this.listenForActiveTabChange();
    this.listenForUrlChangeOnActiveTab();
    this.listenForMessages();
  }

  private listenForActiveTabChange() {
    this.chromeApiBridgeService.onTabActivated()
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
      )
      .subscribe(tab => this.updateStatusFor(tab));
  }

  private listenForUrlChangeOnActiveTab() {
    this.chromeApiBridgeService.onTabUpdated()
      .pipe(
        filter(event => event.tab.status === 'complete'),
        pluck('tab'),
      )
      .subscribe(tab => this.updateStatusFor(tab));
  }

  private listenForMessages() {
    this.chromeInternalMessageService.listenMessage(ChromeInternalMessageType.NOTE_CREATED)
      .subscribe(payload => this.noteCacheService.addToCache(payload.note));

    this.chromeInternalMessageService.listenMessage(ChromeInternalMessageType.NOTE_DELETED)
      .subscribe(payload => this.noteCacheService.removeFromCache(payload.note.url));

    this.chromeInternalMessageService.listenMessage(ChromeInternalMessageType.AUTHORIZED)
      .subscribe(() => this.noteCacheService.softRefresh());

    this.chromeExternalMessageService.listenMessage(ChromeExternalMessageType.AUTHORIZED)
      .subscribe(payload => this.jwtStorageInstance.set(payload.jwt));
  }

  private listenForCacheChange() {
    this.noteCacheService.data$
      .pipe(
        switchMap(() => this.chromeApiBridgeService.getCurrentTab()),
        filter(tab => Boolean(tab)),
      )
      .subscribe(tab => this.updateStatusFor(tab));
  }

  private updateStatusFor(tab: chrome.tabs.Tab) {
    if (this.noteCacheService.isInCache(tab.url)) {
      this.setNoteSavedStatus(tab);
    } else {
      this.setNoteUnsavedStatus(tab);
    }
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
