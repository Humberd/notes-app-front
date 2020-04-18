import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/browser-extension/chrome-api/services/chrome-api-bridge.service';
import { switchMap } from 'rxjs/operators';
import { NoteView } from '@domain/entity/note/view/note-view';
import { NotesRefresherService } from './service/notes-refresher.service';
import { TagsRefresherService } from './service/tags-refresher.service';
import { MyDataDomainService } from '@domain/entity/user/service/my-data-domain.service';

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
    private myDataDomainService: MyDataDomainService,
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
        switchMap(currentTab => this.myDataDomainService.readMyNotesList({url: currentTab.url})),
      )
      .subscribe(response => {
        if (response.data.length > 0) {
          this.note = response.data[0];
        }

        this.changeDetectorRef.markForCheck();
      });
  }

}
