import { Component, OnInit } from '@angular/core';
import { NotesHttpService } from '../_services/notes-http.service';
import { NoteDto } from '../_models/notes';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: NoteDto[];

  constructor(private notesHttpService: NotesHttpService) {
  }

  ngOnInit() {
    this.notesHttpService.readAll()
      .subscribe(notes => this.notes = notes);
  }

}
