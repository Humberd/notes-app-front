import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource } from '@ng-boost/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { TagView } from '@domain/entity/tag/view/tag-view';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { ViewList } from '@domain/common/view-list';

@Injectable()
export class TagsRefresherService extends SpringPageableDataRefresher<TagView> {

  constructor(private tagDomainService: TagDomainService) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    }, {
      pageSize: 999,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<TagView>> {
    return this.tagDomainService.readList();
  }
}
