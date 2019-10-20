import { Injectable } from '@angular/core';
import { ClientSidePageableDataRefresher, NEVER_REFRESH, PageOptions, Refresher } from '@ng-boost/core';
import { Tag } from '../../../models/note';
import { Observable } from 'rxjs';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';

@Injectable()
export class TagsRefresherService extends ClientSidePageableDataRefresher<Tag> {

  constructor(private indexedDbLayerService: IndexedDbLayerService) {
    super({
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): Observable<Tag[]> | Refresher<any, Tag[]> {
    return this.indexedDbLayerService.readTagsList();
  }
}
