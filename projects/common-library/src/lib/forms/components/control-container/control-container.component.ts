import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'lib-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlContainerComponent {
  @Input() label: string;

  constructor(@Optional() private controlContainer: ControlContainer) {
  }
}
