import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { Note } from '../../../models/note';
import { Observable } from 'rxjs';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';
import { NoteTypeRouteParam } from './note-type-route-param';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NotesRefresherService extends ClientSidePageableDataRefresher<Note> {
  constructor(
    private indexedDbLayerService: IndexedDbLayerService,
    private noteTypeRouteParam: NoteTypeRouteParam,
  ) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): Observable<Note[]> | Refresher<any, Note[]> {
    return this.noteTypeRouteParam.value$
      .pipe(
        switchMap(noteType => this.indexedDbLayerService.readList(noteType, '')),
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
