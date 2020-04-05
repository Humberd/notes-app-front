import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { WorkerManager } from 'angular-web-worker/angular';
import { MarkdownPreviewWorker } from 'common-library/lib/markdown-preview/web-workers/markdown-preview.worker';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MarkdownPreviewService {
  constructor(
    private domSanitizer: DomSanitizer,
    private workerManager: WorkerManager,
  ) {

  }

  compile(rawText: string): Observable<string> {
    const client = this.workerManager.createClient(MarkdownPreviewWorker);
    return fromPromise(client.connect())
      .pipe(
        switchMap(() => client.call(worker => worker.renderText(rawText))),
      );
  }
}
