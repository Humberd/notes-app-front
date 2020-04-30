import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource, RouterUtilsService } from '@ng-boost/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { ViewList } from '@domain/common/view-list';
import { NoteView } from '@domain/entity/note/view/note-view';
import { UserDomainService } from '@domain/entity/user/service/user-domain.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NotesSearchService } from '@web-app/app/views/notes/service/notes-search.service';

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
    private noteDomainService: NoteDomainService,
    private routerUtilsService: RouterUtilsService,
    private notesSearchService: NotesSearchService
  ) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<NoteView>> {
    return this.notesSearchService.attributes$
      .pipe(
        switchMap(attributes => this.noteDomainService.readList({
          query: attributes.query,
          // sort: pageOptions.sort,
          // tagIds,
          // workspaceId,
        })),
      );
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
