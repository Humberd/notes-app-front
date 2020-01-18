import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { NoteIdRouteParam } from './note-id-route-param';
import { filter, switchMap } from 'rxjs/operators';
import { Note } from '../../../domains/note/models/note';
import { NotesService } from '../../../domains/note/services/notes.service';

@Injectable()
export class CurrentNoteRefresherService extends SimpleDataRefresher<Note> {

  constructor(
    private notesService: NotesService,
    private noteIdRouteParam: NoteIdRouteParam,
  ) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): Observable<Note> | Refresher<any, Note> {
    return this.noteIdRouteParam.value$
      .pipe(
        filter(value => !!value),
        switchMap(noteId => this.notesService.watch(noteId)),
      );
  }

}
