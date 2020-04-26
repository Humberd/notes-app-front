import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource, RouterUtilsService } from '@ng-boost/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { ViewList } from '@domain/common/view-list';
import { NoteView } from '@domain/entity/note/view/note-view';
import { MyDataDomainService } from '@domain/entity/user/service/my-data-domain.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class NotesRefresherService extends SpringPageableDataRefresher<NoteView> {
  private readonly _tagIds$ = new BehaviorSubject<string[]>([]);
  readonly tagIds$ = this._tagIds$.asObservable();

  get tagIds() {
    return this._tagIds$.value;
  }

  private readonly _workspaceId$ = new BehaviorSubject<string>(undefined);
  readonly workspaceId$ = this._workspaceId$.asObservable();

  get workspaceId() {
    return this._workspaceId$.value;
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
    return combineLatest([
      this._tagIds$,
      this._workspaceId$,
    ])
      .pipe(
        switchMap(([tagIds, workspaceId]) => this.myDataDomainService.readMyNotesList({
          query: pageOptions.search,
          tagIds,
          workspaceId,
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

  filterByWorkspace(workspaceId: string): void {
    this.routerUtilsService.updateQueryParams({
      workspaceId: workspaceId || null,
    });

    this._workspaceId$.next(workspaceId);
  }

  isWorkspaceSelected$(workspaceId: string): Observable<boolean> {
    return this.workspaceId$.pipe(
      map(selectedWorkspaceId => selectedWorkspaceId === workspaceId),
    );
  }
}
