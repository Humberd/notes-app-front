import { Injectable } from '@angular/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { GroupView } from '@domain/entity/group/view/group-view';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource } from '@ng-boost/core';
import { ViewList } from '@domain/common/view-list';
import { GroupDomainService } from '@domain/entity/group/service/group-domain.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsRefresherService extends SpringPageableDataRefresher<GroupView> {

  constructor(
    private groupDomainService: GroupDomainService
  ) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<GroupView>> {
    return this.groupDomainService.readList()
  }

}
