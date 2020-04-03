import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[libIconButton], a[libIconButton]',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {

}
