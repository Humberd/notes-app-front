import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownPreviewPipe } from './pipes/markdown-preview.pipe';
import { MarkdownPreviewComponent } from './components/markdown-preview/markdown-preview.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [MarkdownPreviewPipe, MarkdownPreviewComponent],
  exports: [MarkdownPreviewPipe, MarkdownPreviewComponent],
})
export class MarkdownPreviewModule {
}
