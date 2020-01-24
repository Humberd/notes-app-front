import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { Tag } from '../../../domains/tag/models/tag.model';
import { TagsService } from '../../../domains/tag/services/tags.service';

@Injectable()
export class TagsRefresherService extends ClientSidePageableDataRefresher<Tag> {

  constructor(private tagsService: TagsService) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): Observable<Tag[]> | Refresher<any, Tag[]> {
    return this.tagsService.watchList();
  }
}
