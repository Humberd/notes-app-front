import { Injectable } from '@angular/core';
import { AutorefreshMode, NEVER_REFRESH, PageOptions, RefresherDataSource } from '@ng-boost/core';
import { SpringPageableDataRefresher } from '@domain/common/spring-pageable-data-refresher';
import { ViewList } from '@domain/common/view-list';
import { NoteView } from '@domain/entity/note/view/note-view';
import { MyDataDomainService } from '@domain/entity/user/service/my-data-domain.service';

@Injectable()
export class NotesRefresherService extends SpringPageableDataRefresher<NoteView> {

  constructor(private myDataDomainService: MyDataDomainService) {
    super({
      mode: AutorefreshMode.COUNT_AFTER_PREVIOUS_ENDS,
      period: NEVER_REFRESH,
    });
  }

  protected getPageableDataSource(pageOptions: PageOptions): RefresherDataSource<ViewList<NoteView>> {
    return this.myDataDomainService.readMyNotesList();
  }
}
