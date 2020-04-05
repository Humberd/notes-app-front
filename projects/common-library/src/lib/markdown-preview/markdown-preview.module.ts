import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownPreviewPipe } from './pipes/markdown-preview.pipe';
import { MarkdownPreviewComponent } from './components/markdown-preview/markdown-preview.component';
import { MarkdownPreviewService } from 'common-library/lib/markdown-preview/services/markdown-preview.service';
import { WorkerModule } from 'angular-web-worker/angular';
import { AppWorker } from 'common-library/lib/markdown-preview/web-workers/app.worker';


@NgModule({
  imports: [
    CommonModule,
    WorkerModule.forWorkers([
      {worker: AppWorker, initFn: () => new Worker('./web-workers/app.worker.ts', {type: 'module'})},
    ]),
  ],
  declarations: [MarkdownPreviewPipe, MarkdownPreviewComponent],
  exports: [MarkdownPreviewPipe, MarkdownPreviewComponent],
  providers: [
    MarkdownPreviewService
  ]
})
export class MarkdownPreviewModule {
}
