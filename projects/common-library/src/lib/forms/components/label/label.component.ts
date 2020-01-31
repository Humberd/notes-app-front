import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[libLabel]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {

}
