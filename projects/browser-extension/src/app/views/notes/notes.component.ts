import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/browser-extension/chrome-api/services/chrome-api-bridge.service';
import { switchMap, tap } from 'rxjs/operators';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteView } from '@domain/entity/note/view/note-view';

@Component({
  selector: 'brx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  isNoteCreated: boolean;
  note: NoteView;
  tabId: number;

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private noteDomainService: NoteDomainService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.chromeApiBridgeService.getCurrentTab()
      .pipe(
        tap(currentTab => this.tabId = currentTab.id),
        switchMap(currentTab => this.noteDomainService.read(currentTab.url)),
      )
      .subscribe({
        next: note => {
          this.isNoteCreated = true;
          this.note = note;
          this.changeDetectorRef.markForCheck();
        },
        error: err => {
          this.isNoteCreated = false;
          this.changeDetectorRef.markForCheck();
        },
      });
  }

  handleNoteCreated(event: NoteView) {
    this.isNoteCreated = true;
    this.note = event;
  }

}
