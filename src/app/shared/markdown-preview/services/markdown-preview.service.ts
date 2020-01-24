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
      const worker = new Worker('../web-workers/markdown-preview.worker', {type: 'module'});

      worker.onmessage = ({data}) => {
        subscriber.next(this.domSanitizer.sanitize(SecurityContext.HTML, data));
        subscriber.complete();
      };

      worker.onerror = ev => {
        subscriber.error(ev);
      };

      worker.postMessage(rawText);
    });
  }
}
