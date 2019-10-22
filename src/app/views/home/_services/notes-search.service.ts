import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Destroy$, RouterUtilsService } from '@ng-boost/core';
import { ActivatedRoute } from '@angular/router';
import { filter, pluck, takeUntil } from 'rxjs/operators';

export const NOTES_SEARCH_QUERY_PARAM = 'search' as const;

@Injectable()
export class NotesSearchService {
  @Destroy$() private readonly destroy$ = new Subject();
  // tslint:disable-next-line:variable-name
  private readonly _query$ = new BehaviorSubject<string>('');
  readonly query$ = this._query$.asObservable();

  get query() {
    return this._query$.value;
  }

  private setQuery(query: string) {
    this._query$.next(query || '');
  }

  constructor(private routerUtilsService: RouterUtilsService) {
  }

  start(activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroy$),
        pluck(NOTES_SEARCH_QUERY_PARAM),
        filter(newQuery => newQuery !== this.query),
      )
      .subscribe(newQuery => this.setQuery(newQuery));
  }

  updateQuery(query: string) {
    if (query === this.query) {
      return;
    }

    this.setQuery(query);

    this.routerUtilsService.updateQueryParams({
      [NOTES_SEARCH_QUERY_PARAM]: query || null,
    });
  }
}
