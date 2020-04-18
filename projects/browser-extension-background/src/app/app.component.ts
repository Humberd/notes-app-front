import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/browser-extension/chrome-api/services/chrome-api-bridge.service';
import { map, switchMap } from 'rxjs/operators';
import { MyDataDomainService } from '@domain/entity/user/service/my-data-domain.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private myDataDomainService: MyDataDomainService,
  ) {
    console.log('Browser Extension Background is running');

    chromeApiBridgeService.onTabActivated()
      .pipe(
        switchMap(() => chromeApiBridgeService.getCurrentTab()),
        switchMap(tab =>
          myDataDomainService.readMyNotesList({
            url: tab.url,
          })
            .pipe(
              map(notes => ({tab, notes})),
            ),
        ),
      )
      .subscribe(({tab, notes}) => {
        if (notes.data.length !== 0) {
          forkJoin([
            chromeApiBridgeService.setBadgeText({
              tabId: tab.id,
              text: '✓',
            }),
            chromeApiBridgeService.setBadgeBackgroundColor({
              tabId: tab.id,
              color: '#006100',
            }),
          ])
            .subscribe();
        } else {
          chromeApiBridgeService.setBadgeText({
            text: '',
            tabId: tab.id,
          })
            .subscribe();
        }
      });

  }
}
