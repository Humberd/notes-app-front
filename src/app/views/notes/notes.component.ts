import { Component, OnInit } from '@angular/core';
import { NotesRefresherService } from './_services/notes-refresher.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  viewProviders: [
    NotesRefresherService,
  ],
})
export class NotesComponent implements OnInit {

  constructor(private notesRefresherService: NotesRefresherService) {
  }

  ngOnInit() {
    this.notesRefresherService.start();
  }

}
