import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'browser-extension-background';

  constructor() {
    console.log('hello');
  }
}
