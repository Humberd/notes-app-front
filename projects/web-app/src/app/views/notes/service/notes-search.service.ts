import { Injectable } from '@angular/core';
import { RouterUtilsService } from '@ng-boost/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class NotesSearchService {
  private readonly _attributes$ = new BehaviorSubject<SearchAttributes>({
    query: null,
    workspaceId: null,
    tagIds: [],
    sort: null,
  });


  readonly attributes$ = this._attributes$.asObservable();

  get attributes() {
    return this._attributes$.value;
  }

  constructor(
    private routerUtilsService: RouterUtilsService,
    private router: Router,
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const sort = {
            by: this.routerUtilsService.getQueryParam('sortBy'),
            direction: this.routerUtilsService.getQueryParam('sortDirection'),
          };

          return ({
            query: this.routerUtilsService.getQueryParam('query'),
            workspaceId: this.routerUtilsService.getQueryParam('workspaceId'),
            tagIds: this.getAllQueryParams('tagIds') || [],
            sort: sort.by && sort.direction ? sort : null,
          } as SearchAttributes);
        }),
      )
      .subscribe(attributes => this.internalPatch(attributes));
  }

  patch(attributes: Partial<SearchAttributes>) {
    this.internalPatch(attributes);

    this.syncWithUrl(this.attributes);
  }

  private internalPatch(attributes: Partial<SearchAttributes>) {
    const newState: SearchAttributes = {
      query: attributes.hasOwnProperty('query') ? (attributes.query || null) : this.attributes.query,
      workspaceId: attributes.hasOwnProperty('workspaceId') ? (attributes.workspaceId || null) : this.attributes.workspaceId,
      tagIds: attributes.hasOwnProperty('tagIds') ? (attributes.tagIds || null) : this.attributes.tagIds,
      sort: attributes.hasOwnProperty('sort') ? (attributes.sort || null) : this.attributes.sort,
    };

    if (!this.hasStateChanged(this.attributes, newState)) {
      return;
    }

    this._attributes$.next(newState);
  }

  private syncWithUrl(attributes: SearchAttributes) {
    this.routerUtilsService.updateQueryParams({
      query: attributes.query || null,
      workspaceId: attributes.workspaceId || null,
      tagIds: attributes.tagIds.length === 0 ? null : attributes.tagIds,
      sortBy: attributes.sort?.by || null,
      sortDirection: attributes.sort?.direction || null,
    });
  }

  private getAllQueryParams(queryParam: string): string[] | null {
    for (const route of this.routerUtilsService.getCurrentRoutesChain()) {
      if (route.snapshot.queryParamMap.has(queryParam)) {
        return route.snapshot.queryParamMap.getAll(queryParam);
      }
    }
    return null;
  }

  private hasStateChanged(oldState: SearchAttributes, newState: SearchAttributes) {
    return JSON.stringify(oldState) !== JSON.stringify(newState);
  }
}

interface SearchAttributes {
  query: string | null;
  workspaceId: string | null;
  tagIds: string[],
  sort: Sort | null
}

interface Sort {
  by: string,
  direction: 'asc' | 'desc';
}
