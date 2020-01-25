import { Injectable, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MarkdownPreviewService {

  constructor(private domSanitizer: DomSanitizer) {
  }

  compile(rawText: string): Observable<string> {
    return new Observable<string>(subscriber => {
      const worker = new Worker('../../../../../../src/app/web-workers/markdown-preview.worker', {type: 'module'});

      worker.onmessage = ({data}) => {
        worker.terminate();
        subscriber.next(this.domSanitizer.sanitize(SecurityContext.HTML, data));
        subscriber.complete();
      };

      worker.onerror = ev => {
        worker.terminate();
        subscriber.error(ev);
      };

      worker.postMessage(rawText);
    });
  }
}
