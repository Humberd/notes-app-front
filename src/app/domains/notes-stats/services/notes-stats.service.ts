import { Injectable } from '@angular/core';
import { NotesStatsIndexedDbRepositoryService } from './notes-stats-indexed-db-repository.service';
import { Observable } from 'rxjs';
import { NotesStats } from '../models/notes-stats';

@Injectable({
  providedIn: 'root',
})
export class NotesStatsService {

  constructor(private repository: NotesStatsIndexedDbRepositoryService) {
  }

  read(): Observable<NotesStats> {
    return this.repository.read();
  }

  watch(): Observable<NotesStats> {
    return this.repository.watch();
  }
}
