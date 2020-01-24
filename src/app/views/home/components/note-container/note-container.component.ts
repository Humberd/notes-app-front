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
      labelTK: 'common.raw',
      icon: 'code',
    },
    {
      id: 'split',
      labelTK: 'common.split',
      icon: 'vertical_split',
    },
    {
      id: 'preview',
      labelTK: 'common.preview',
      icon: 'insert_drive_file',
    },
  ];

  constructor(
    public currentNoteRefresher: CurrentNoteRefresherService,
  ) {
  }

}
