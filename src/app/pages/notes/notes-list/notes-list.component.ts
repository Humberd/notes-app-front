import { Component, OnInit } from '@angular/core';
import { NotesHttpService } from '../_services/notes-http.service';
import { NoteDto } from '../_models/notes';
import { SearchService } from '../_services/search.service';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: NoteDto[];

  constructor(private notesHttpService: NotesHttpService,
              private searchService: SearchService) {
  }

  ngOnInit() {
    combineLatest(this.searchService.tags$, this.searchService.text$)
      .pipe(
        switchMap(([tags, query]) => this.notesHttpService.readAll(tags.map(it => it.id), query))
      )
      .subscribe(notes => this.notes = notes);
  }

}
