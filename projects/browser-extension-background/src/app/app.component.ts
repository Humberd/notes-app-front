import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/browser-extension/chrome-api/services/chrome-api-bridge.service';

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(private chromeApiBridgeService: ChromeApiBridgeService) {
    console.log('Browser Extension Background is running');

    chromeApiBridgeService.onTabActivated()
      .subscribe(tabInfo => {
        console.log('is inzone: ', NgZone.isInAngularZone());
      });
  }
}
