import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { switchMap } from 'rxjs/operators';
import { NoteView } from '@domain/entity/note/view/note-view';
import { NotesRefresherService } from './service/notes-refresher.service';
import { TagsRefresherService } from './service/tags-refresher.service';
import { UserDomainService } from '@domain/entity/user/service/user-domain.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';

@Component({
  selector: 'brx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    NotesRefresherService,
    TagsRefresherService,
  ],
})
export class NotesComponent implements OnInit {
  note: NoteView;

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private noteDomainService: NoteDomainService,
    private myDataDomainService: UserDomainService,
    private changeDetectorRef: ChangeDetectorRef,
    private notesRefresherService: NotesRefresherService,
    private tagsRefresherService: TagsRefresherService,
  ) {
  }

  ngOnInit(): void {
    this.notesRefresherService.start();
    this.tagsRefresherService.start();

    this.chromeApiBridgeService.getCurrentTab()
      .pipe(
        switchMap(currentTab => this.noteDomainService.readList({url: currentTab.url})),
      )
      .subscribe(response => {
        if (response.data.length > 0) {
          this.note = response.data[0];
        }

        this.changeDetectorRef.markForCheck();
      });
  }

}
