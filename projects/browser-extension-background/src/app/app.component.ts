import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor() {
    console.log('Browser Extension Background is running');
    console.log('hello from updated');
  }
}
