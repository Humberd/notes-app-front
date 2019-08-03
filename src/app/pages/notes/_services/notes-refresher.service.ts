import { Injectable } from '@angular/core';
import { Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { NoteDto } from '../_models/notes';
import { combineLatest, Observable } from 'rxjs';
import { NotesHttpService } from './notes-http.service';
import { switchMap } from 'rxjs/operators';
import { SearchService } from './search.service';

@Injectable()
export class NotesRefresherService extends SimpleDataRefresher<NoteDto[]> {

  constructor(
    private notesHttpService: NotesHttpService,
    private searchService: SearchService
  ) {
    super();
  }

  protected getDataSource(): Observable<NoteDto[]> | Refresher<any, NoteDto[]> {
    return combineLatest(this.searchService.tags$, this.searchService.text$)
      .pipe(
        switchMap(([tags, query]) => this.notesHttpService.readAll(tags.map(
          it => it.id), query))
      );
  }


}
