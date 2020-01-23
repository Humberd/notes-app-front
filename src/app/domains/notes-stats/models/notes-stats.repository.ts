import { Observable } from 'rxjs';
import { NotesStats } from './notes-stats';

export interface NotesStatsRepository {
  read(): Observable<NotesStats>;

  watch(): Observable<NotesStats>;
}
