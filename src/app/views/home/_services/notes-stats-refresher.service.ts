import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { NotesStats } from '../../../domains/notes-stats/models/notes-stats';
import { Observable } from 'rxjs';
import { NotesStatsService } from '../../../domains/notes-stats/services/notes-stats.service';

@Injectable()
export class NotesStatsRefresherService extends SimpleDataRefresher<NotesStats> {

  constructor(private notesStatsService: NotesStatsService) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): Observable<NotesStats> | Refresher<any, NotesStats> {
    return this.notesStatsService.watch();
  }

}
