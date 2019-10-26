import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { Tag } from '../../../models/note';
import { Observable } from 'rxjs';
import { DataAccessService } from '../../../core/data-access-layers/data-access.service';

@Injectable()
export class TagsRefresherService extends ClientSidePageableDataRefresher<Tag> {

  constructor(private dataAccessService: DataAccessService) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): Observable<Tag[]> | Refresher<any, Tag[]> {
    return this.dataAccessService.readTagsList();
  }
}
