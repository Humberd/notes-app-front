import { Injectable } from '@angular/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';
import { WorkspaceDomainService } from '@domain/entity/workspace/service/workspace-domain.service';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource } from '@ng-boost/core';
import { ViewList } from '@domain/common/view-list';

@Injectable()
export class WorkspacesRefresherService extends SpringPageableDataRefresher<WorkspaceView> {
  constructor(private workspaceDomainService: WorkspaceDomainService) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    }, {pageSize: 999});
  }

  protected getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<WorkspaceView>> {
    return this.workspaceDomainService.readList();
  }

}
