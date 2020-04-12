import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource, RouterUtilsService } from '@ng-boost/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { ViewList } from '@domain/common/view-list';
import { NoteView } from '@domain/entity/note/view/note-view';
import { MyDataDomainService } from '@domain/entity/user/service/my-data-domain.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class NotesRefresherService extends SpringPageableDataRefresher<NoteView> {
  private readonly _tagIds$ = new BehaviorSubject<string[]>([]);
  readonly tagIds$ = this._tagIds$.asObservable();

  get tagIds() {
    return this._tagIds$.value;
  }

  constructor(
    private myDataDomainService: MyDataDomainService,
    private routerUtilsService: RouterUtilsService,
  ) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<NoteView>> {
    return this._tagIds$
      .pipe(
        switchMap(tagIds => this.myDataDomainService.readMyNotesList({
          query: pageOptions.search,
          tagIds,
        })),
      );
  }

  search(searchQuery: string): void {
    this.routerUtilsService.updateQueryParams({
      searchQuery: searchQuery || null,
    });
    super.search(searchQuery);
  }

  filterByTags(tagIds: string[]): void {
    this.routerUtilsService.updateQueryParams({
      tagIds: tagIds || null,
    });

    this._tagIds$.next(tagIds);
  }

  isTagSelected$(tagId: string): Observable<boolean> {
    return this.tagIds$.pipe(
      map(selectedTagIds => selectedTagIds.some(it => it === tagId)),
    );
  }
}
