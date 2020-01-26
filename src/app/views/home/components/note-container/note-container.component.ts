import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrentNoteRefresherService } from '../../services/current-note-refresher.service';
import { ViewSwitcherConfig } from 'components-library/lib/view-switcher/models/view-switcher-config';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContainerComponent {
  viewSwitcherConfig: ViewSwitcherConfig[] = [
    {
      id: 'code',
      label: 'common.raw',
      icon: 'code',
    },
    {
      id: 'split',
      label: 'common.split',
      icon: 'vertical_split',
    },
    {
      id: 'preview',
      label: 'common.preview',
      icon: 'insert_drive_file',
    },
  ];

  constructor(
    public currentNoteRefresher: CurrentNoteRefresherService,
  ) {
  }

}
