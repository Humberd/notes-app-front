import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { NoteView } from '@domain/entity/note/view/note-view';
import { Observable } from 'rxjs';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteIdParamService } from '@web-app/app/views/notes/views/note-details/service/note-id-param.service';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CurrentNoteRefresherService extends SimpleDataRefresher<NoteView> {

  constructor(
    private noteDomainService: NoteDomainService,
    private noteIdParamService: NoteIdParamService,
    private router: Router,
  ) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): Observable<NoteView> | Refresher<any, NoteView> {
    return this.noteIdParamService.value$
      .pipe(
        distinctUntilChanged(),
        switchMap(noteId => this.noteDomainService.read(noteId)),
      );
  }

  protected onError(err: any): void {
    this.router.navigate(['../']);
  }
}
