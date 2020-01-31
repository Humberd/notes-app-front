import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MarkdownPreviewService } from 'common-library/lib/markdown-preview/services/markdown-preview.service';

@Component({
  selector: 'lib-markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'lib-markdown-preview',
  },
})
export class MarkdownPreviewComponent implements OnInit {
  @Input()
  set text(text: string) {
    this.markdownPreviewService.compile(text)
      .subscribe(htmlOutput => {
        this.elementRef.nativeElement.innerHTML = htmlOutput;
      });
  }

  constructor(
    private markdownPreviewService: MarkdownPreviewService,
    private elementRef: ElementRef<HTMLElement>,
  ) {
  }

  ngOnInit() {
  }

}
