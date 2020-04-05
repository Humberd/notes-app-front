import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { WorkerClient, WorkerManager } from 'angular-web-worker/angular';
import { AppWorker } from 'common-library/lib/markdown-preview/web-workers/app.worker';

@Injectable()
export class MarkdownPreviewService {

  private client: WorkerClient<AppWorker>;

  constructor(
    private domSanitizer: DomSanitizer,
    private workerManager: WorkerManager,
  ) {
    if (this.workerManager.isBrowserCompatible) {
      this.client = this.workerManager.createClient(AppWorker);
    } else {
      // if code won't block UI else implement other fallback behaviour
      this.client = this.workerManager.createClient(AppWorker, true);
    }

    this.client.connect();
  }

  compile(rawText: string): Observable<string> {
    return new Observable<string>(subscriber => {
      // const worker = new Worker('../../../../../../src/app/web-workers/markdown-preview.worker', {type: 'module'});
      //
      // worker.onmessage = ({data}) => {
      //   worker.terminate();
      //   subscriber.next(this.domSanitizer.sanitize(SecurityContext.HTML, data));
      //   subscriber.complete();
      // };
      //
      // worker.onerror = ev => {
      //   worker.terminate();
      //   subscriber.error(ev);
      // };
      //
      // worker.postMessage(rawText);
    });
  }
}
