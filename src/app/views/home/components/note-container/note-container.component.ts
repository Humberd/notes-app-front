import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrentNoteRefresherService } from '../../services/current-note-refresher.service';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContainerComponent {
  constructor(
    public currentNoteRefresher: CurrentNoteRefresherService,
  ) {
  }

}
