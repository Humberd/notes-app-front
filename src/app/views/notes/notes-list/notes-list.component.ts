import { Component } from '@angular/core';
import { NoteDto } from '../_models/notes';
import { NotesRefresherService } from '../_services/notes-refresher.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent {

  constructor(public notesRefresherService: NotesRefresherService) {
  }

  trackBy(
    index: number,
    note: NoteDto,
  ) {
    return note.id;
  }

}
