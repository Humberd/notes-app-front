import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { Note } from '../../../models/note';
import { combineLatest, Observable } from 'rxjs';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';
import { NoteTypeRouteParam } from './note-type-route-param';
import { switchMap } from 'rxjs/operators';
import { NotesSearchService } from './notes-search.service';

@Injectable()
export class NotesRefresherService extends ClientSidePageableDataRefresher<Note> {
  constructor(
    private indexedDbLayerService: IndexedDbLayerService,
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
        switchMap(([noteType, query]) => this.indexedDbLayerService.readList(noteType, query)),
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
