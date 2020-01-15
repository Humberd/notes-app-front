import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { NoteIdRouteParam } from './note-id-route-param';
import { switchMap } from 'rxjs/operators';
import { DataAccessService } from '../../../core/data-access-layers/data-access.service';
import { Note } from '../../../domains/note/models/note.model';

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
