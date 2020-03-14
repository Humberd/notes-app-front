import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { ChromeApiBridgeService } from 'composite-library/lib/browser-extension/chrome-api/services/chrome-api-bridge.service';
import { ContentScriptsService } from 'composite-library/lib/browser-extension/content-scripts/services/content-scripts.service';
import { takeUntil } from 'rxjs/operators';
import { ListenMessageResult } from 'composite-library/lib/browser-extension/chrome-api/models/listen-message-result';
import { ContentScriptRequestType } from 'composite-library/lib/browser-extension/content-scripts/models/content-script-request-type';
import {
  ContentScriptResponse,
  ContentScriptResponseType,
} from 'composite-library/lib/browser-extension/content-scripts/models/content-script-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @Destroy$()
  private readonly destroy$ = new Subject();

  contentSelectionMode: ListenMessageResult<ContentScriptRequestType, ContentScriptResponse>;

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private contentScriptsService: ContentScriptsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.contentScriptsService.watchForSelectionMode()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(message => {
        console.log('received');
        if (this.contentSelectionMode) {
          message.sendResponse({
            type: ContentScriptResponseType.ALREADY_EXISTS,
          });

          return;
        }

        this.contentSelectionMode = message;
        this.changeDetectorRef.markForCheck();
      });
  }

  handleSave(selectedContent: string) {
    this.contentSelectionMode.sendResponse({
      type: ContentScriptResponseType.SAVE,
      content: selectedContent,
    });

    this.contentSelectionMode = undefined;
    this.changeDetectorRef.markForCheck();
  }

  handleCancel() {
    this.contentSelectionMode.sendResponse({
      type: ContentScriptResponseType.CANCEL,
    });

    this.contentSelectionMode = undefined;
    this.changeDetectorRef.markForCheck();
  }
}
