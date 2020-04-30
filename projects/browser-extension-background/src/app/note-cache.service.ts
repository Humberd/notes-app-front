import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, RefresherDataSource, SimpleDataRefresher } from '@ng-boost/core';
import { NoteView } from '@domain/entity/note/view/note-view';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { pluck } from 'rxjs/operators';

type Url = string;

@Injectable()
export class NoteCacheService extends SimpleDataRefresher<NoteView[]> {
  private lookupCache = new Map<Url, NoteView>();

  constructor(private noteDomainService: NoteDomainService) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): RefresherDataSource<NoteView[]> {
    return this.noteDomainService.readList({
      pageSize: 9999,
    })
      .pipe(pluck('data'));
  }

  protected onSuccess(notes: NoteView[]): void {
    this.lookupCache.clear();
    notes
      .filter(note => !!note.url)
      .forEach(note => this.lookupCache.set(note.url, note));
  }

  isInCache(url: string): boolean {
    return this.lookupCache.has(url);
  }

  getFromCache(url: string): NoteView {
    if (!this.isInCache(url)) {
      return;
    }

    return this.lookupCache.get(url);
  }
}
