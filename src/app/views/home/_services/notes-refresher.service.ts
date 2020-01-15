import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { combineLatest, Observable } from 'rxjs';
import { NoteTypeRouteParam } from './note-type-route-param';
import { switchMap } from 'rxjs/operators';
import { NotesSearchService } from './notes-search.service';
import { Note } from '../../../domains/note/models/note';
import { NotesService } from '../../../domains/note/services/notes.service';

@Injectable()
export class NotesRefresherService extends ClientSidePageableDataRefresher<Note> {
  constructor(
    private notesService: NotesService,
    private noteTypeRouteParam: NoteTypeRouteParam,
    private notesSearchService: NotesSearchService,
  ) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): Observable<Note[]> | Refresher<any, Note[]> {
    return combineLatest(
      this.noteTypeRouteParam.value$,
      this.notesSearchService.query$,
    )
      .pipe(
        switchMap(([noteType, query]) => this.notesService.readList({
          type: noteType,
          searchQuery: query,
        })),
      );
  }

  updateRef(note: Note) {
    const noteIndex = this.data.findIndex(value => value.id === note.id);
    if (noteIndex < 0) {
      console.warn('note doesnt exist', note);
      return;
    }
    const newData = [...this.data];
    newData.splice(noteIndex, 1, note);
    this._data$.next(newData);
  }

}
