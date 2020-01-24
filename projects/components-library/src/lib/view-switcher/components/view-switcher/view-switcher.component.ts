import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewSwitcherService } from 'components-library/lib/view-switcher/services/view-switcher.service';
import { ViewSwitcherConfig } from 'components-library/lib/view-switcher/models/view-switcher-config';

@Component({
  selector: 'lib-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ViewSwitcherService],
})
export class ViewSwitcherComponent {
  @Input()
  set config(config: ViewSwitcherConfig[]) {
    this.viewSwitcherService.setAvailableViews(config);
  }

  constructor(private viewSwitcherService: ViewSwitcherService) {
  }

}
