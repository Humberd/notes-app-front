import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { combineLatest, Observable } from 'rxjs';
import { NoteTypeRouteParam } from './note-type-route-param';
import { switchMap } from 'rxjs/operators';
import { NotesSearchService } from './notes-search.service';
import { DataAccessService } from '../../../core/data-access-layers/data-access.service';
import { Note } from '../../../domains/note/models/note.model';

@Injectable()
export class NotesRefresherService extends ClientSidePageableDataRefresher<Note> {
  constructor(
    private dataAccessService: DataAccessService,
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
        switchMap(([noteType, query]) => this.dataAccessService.readList(noteType, query)),
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
