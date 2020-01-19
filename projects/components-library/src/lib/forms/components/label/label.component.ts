import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'label[libLabel]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {

}
