import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, RefresherDataSource, SimpleDataRefresher } from '@ng-boost/core';
import { NoteView } from '@domain/entity/note/view/note-view';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

type Url = string;

@Injectable()
export class NoteCacheService extends SimpleDataRefresher<Map<Url, NoteView>> {
  constructor(private noteDomainService: NoteDomainService) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });

    this._data$.next(new Map());
  }

  protected getDataSource(): RefresherDataSource<Map<Url, NoteView>> {
    return this.noteDomainService.readList({
      pageSize: 9999,
    })
      .pipe(
        map(response => {
          const cache = new Map<Url, NoteView>();

          response.data
            .filter(note => !!note.url)
            .forEach(note => cache.set(note.url, note));

          return cache;
        }),
      );
  }


  protected onError(err: HttpErrorResponse): void {
    if (err.status === 403) {
      return;
    }

    console.error(err);
  }

  isInCache(url: string): boolean {
    return this.data.has(url);
  }

  addToCache(note: NoteView) {
    if (note.url) {
      this.data.set(note.url, note);
      this._data$.next(this.data);
    }
  }

  removeFromCache(url: string) {
    this.data.delete(url);
    this._data$.next(this.data);
  }

  getFromCache(url: string): NoteView {
    if (!this.isInCache(url)) {
      return;
    }

    return this.data.get(url);
  }
}
