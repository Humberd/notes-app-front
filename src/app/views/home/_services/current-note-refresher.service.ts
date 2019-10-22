import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { Note } from '../../../models/note';
import { Observable } from 'rxjs';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';
import { NoteIdRouteParam } from './note-id-route-param';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CurrentNoteRefresherService extends SimpleDataRefresher<Note> {

  constructor(
    private indexedDb: IndexedDbLayerService,
    private noteIdRouteParam: NoteIdRouteParam,
  ) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): Observable<Note> | Refresher<any, Note> {
    return this.noteIdRouteParam.value$
      .pipe(
        switchMap(noteId => this.indexedDb.read(noteId)),
      );
  }

}
