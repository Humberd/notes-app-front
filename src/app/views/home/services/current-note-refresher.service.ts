import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { NoteIdRouteParam } from './note-id-route-param';
import { filter, switchMap } from 'rxjs/operators';
import { Note } from '../../../../../projects/domains/src/lib/note/models/note';
import { NotesService } from '../../../../../projects/domains/src/lib/note/services/notes.service';
import { NoteRouteTitleResolver } from '../../../shared/common/_services/note-route-title-resolver.service';

@Injectable()
export class CurrentNoteRefresherService extends SimpleDataRefresher<Note> {

  constructor(
    private notesService: NotesService,
    private noteIdRouteParam: NoteIdRouteParam,
    private noteNameRouteTitleResolver: NoteRouteTitleResolver,
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

  protected onSuccess(success: Note): void {
    this.noteNameRouteTitleResolver.setTitle(success);
  }
}
