import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a[libLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {

}
