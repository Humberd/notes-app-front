import { Injectable } from '@angular/core';
import { NEVER_REFRESH, Refresher, SimpleDataRefresher } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { Tag } from 'domains/lib/tag/models/tag.model';
import { TagsService } from 'domains/lib/tag/services/tags.service';

@Injectable()
export class TagsRefresherService extends SimpleDataRefresher<Tag[]> {

  constructor(private tagsService: TagsService) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getDataSource(): Observable<Tag[]> | Refresher<any, Tag[]> {
    return this.tagsService.watchList();
  }
}
