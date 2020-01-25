import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownPreviewService } from '../services/markdown-preview.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'markdownPreview',
})
export class MarkdownPreviewPipe implements PipeTransform {

  constructor(private markdownPreviewService: MarkdownPreviewService) {
  }

  transform(rawText: string): Observable<string> {
    return this.markdownPreviewService.compile(rawText);
  }

}
