import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeApiBridgeService } from '../../services/chrome-api/chrome-api-bridge.service';
import { NotesService } from 'domains/lib/note/services/notes.service';
import { switchMap } from 'rxjs/operators';
import { Note } from 'domains/lib/note/models/note';

@Component({
  selector: 'brx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  isNoteCreated: boolean;
  note: Note;

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private notesService: NotesService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.chromeApiBridgeService.getCurrentTab()
      .pipe(
        switchMap(currentTab => this.notesService.readByUrl(currentTab.url)),
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

  handleNoteCreated(event: Note) {
    this.isNoteCreated = true;
    this.note = event;
  }

}
