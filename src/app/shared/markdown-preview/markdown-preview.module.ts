import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownPreviewPipe } from './pipes/markdown-preview.pipe';


@NgModule({
  declarations: [MarkdownPreviewPipe],
  imports: [
    CommonModule,
  ],
  exports: [MarkdownPreviewPipe],
})
export class MarkdownPreviewModule {
}
