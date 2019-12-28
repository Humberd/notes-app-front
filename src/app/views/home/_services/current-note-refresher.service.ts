import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { Note } from '../../../models/note';
import { Observable } from 'rxjs';
import { NoteIdRouteParam } from './note-id-route-param';
import { switchMap } from 'rxjs/operators';
import { DataAccessService } from '../../../core/data-access-layers/data-access.service';

@Injectable()
export class CurrentNoteRefresherService extends SimpleDataRefresher<Note> {

  constructor(
    private dataAccessService: DataAccessService,
    private noteIdRouteParam: NoteIdRouteParam,
  ) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): Observable<Note> | Refresher<any, Note> {
    return this.noteIdRouteParam.value$
      .pipe(
        switchMap(noteId => this.dataAccessService.read(noteId)),
      );
  }

}
