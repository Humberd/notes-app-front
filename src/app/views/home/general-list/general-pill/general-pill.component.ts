import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-general-pill',
  templateUrl: './general-pill.component.html',
  styleUrls: ['./general-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralPillComponent {
  @Input() icon: string;
  @Input() name: string;
  @Input() counter: number;
  @Input() href?: any;
  @Output() action = new EventEmitter();

}
