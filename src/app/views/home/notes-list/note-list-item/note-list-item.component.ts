import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../models/note';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
  note: Note;

  @Input()
  set note2(note: Note) {
    console.log(note.title);
    this.note = note;
  }

}
