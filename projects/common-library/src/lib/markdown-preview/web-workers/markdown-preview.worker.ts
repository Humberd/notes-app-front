import { AngularWebWorker, bootstrapWorker, Callable } from 'angular-web-worker';
import * as marked from 'marked';
/// <reference lib="webworker" />

marked.setOptions({
  gfm: true,
  headerIds: true,
  smartLists: true,
  smartypants: true,
  mangle: true,
});

@AngularWebWorker()
export class MarkdownPreviewWorker {

  @Callable()
  renderText(text: string): string {
    return marked(text);
  }

}

bootstrapWorker(MarkdownPreviewWorker);
