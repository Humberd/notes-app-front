import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotesService } from '../../../core/notes/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {

  constructor(public notesService: NotesService) {
  }

}
