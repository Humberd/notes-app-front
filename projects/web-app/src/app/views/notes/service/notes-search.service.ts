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
          return ({
            query: this.routerUtilsService.getQueryParam('query'),
            workspaceId: this.routerUtilsService.getQueryParam('workspaceId'),
            tagIds: this.getAllQueryParams('tagIds') || [],
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
      query: attributes.query || this.attributes.query,
      workspaceId: attributes.workspaceId || this.attributes.workspaceId,
      tagIds: attributes.tagIds || this.attributes.tagIds,
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
  tagIds: string[]
}
