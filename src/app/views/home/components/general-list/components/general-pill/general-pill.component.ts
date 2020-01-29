import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PanelExpansionStatus } from '../../../../models/panel-expansion-status';
import { OptionConfig } from '../../../../../../shared/common/optionConfig';

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
  @Input() optionConfig?: OptionConfig<any>;
  @Output() action = new EventEmitter();

  PanelExpansionStatus = PanelExpansionStatus;

  isVisible(): boolean {
    return this.expansionStatus === PanelExpansionStatus.VISIBLE;
  }

  getTooltip() {
    if (this.expansionStatus === PanelExpansionStatus.VISIBLE) {
      return;
    }

    if (this.counter === undefined || this.counter === null) {
      return this.name;
    }

    return `${this.name} (${this.counter})`;
  }

}
