import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesService } from '../../../core/notes/notes.service';
import { map, switchMap } from 'rxjs/operators';
import { Destroy$ } from '@ng-boost/core';
import { Observable, Subject } from 'rxjs';
import { Note } from '../../../models/note';
import { ActivatedRoute } from '@angular/router';
import { NoteIdRouteParam } from '../_services/note-id-route-param';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [NoteIdRouteParam],
})
export class NoteContainerComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  currentNote$: Observable<Note>;

  constructor(
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute,
    private noteIdRouteParam: NoteIdRouteParam,
  ) {
  }

  ngOnInit() {
    this.currentNote$ = this.noteIdRouteParam.value$
      .pipe(
        switchMap(noteId => this.notesService.notes$
          .pipe(
            map(notes => notes.find(note => note.id === noteId)),
          ),
        ),
      );
  }

}
