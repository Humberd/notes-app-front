import { Injectable } from '@angular/core';
import { NotesStatsRepository } from '../models/notes-stats.repository';
import { Observable } from 'rxjs';
import { NotesStats } from '../models/notes-stats';
import { IndexedDbLayerService } from '../../data-access/indexed-db/indexed-db.layer.service';

@Injectable({
  providedIn: 'root',
})
export class NotesStatsIndexedDbRepositoryService implements NotesStatsRepository {
  constructor(private indexedDbLayer: IndexedDbLayerService) {
  }

  read(): Observable<NotesStats> {
    return this.indexedDbLayer.readNotesStats();
  }

  watch(): Observable<NotesStats> {
    return this.indexedDbLayer.watchNotesStats();
  }

}
