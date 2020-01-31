import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewSwitcherService } from '../../services/view-switcher.service';

@Component({
  selector: 'lib-view-switcher-controls',
  templateUrl: './view-switcher-controls.component.html',
  styleUrls: ['./view-switcher-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitcherControlsComponent {

  constructor(public noteViewSwitcherService: ViewSwitcherService) {
  }

}
