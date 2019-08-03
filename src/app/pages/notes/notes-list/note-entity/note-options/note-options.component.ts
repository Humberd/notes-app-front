import { Component, Input } from '@angular/core';
import { NoteDto } from '../../../_models/notes';
import { NotesDialogService } from '../../../_dialogs/notes-dialog.service';

@Component({
  selector: 'app-note-options',
  templateUrl: './note-options.component.html',
  styleUrls: ['./note-options.component.scss']
})
export class NoteOptionsComponent {
  @Input() note: NoteDto;

  constructor(private notesDialogService: NotesDialogService) {

  }

  editNote() {
    this.notesDialogService.openEditDialog(this.note);
  }

}
