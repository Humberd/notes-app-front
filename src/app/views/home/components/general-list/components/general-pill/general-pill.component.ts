import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PanelExpansionStatus } from '../../../../models/panel-expansion-status';

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
  @Input() isHrefActive?: boolean;
  @Input() expansionStatus: PanelExpansionStatus;
  @Output() action = new EventEmitter();

  isVisible(): boolean {
    return this.expansionStatus === PanelExpansionStatus.VISIBLE;
  }

}
