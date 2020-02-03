import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'domains/lib/note/services/notes.service';
import { ChromeApiBridgeService } from '../../../../services/chrome-api/chrome-api-bridge.service';
import { Note } from 'domains/lib/note/models/note';

@Component({
  selector: 'brx-note-not-created',
  templateUrl: './note-not-created.component.html',
  styleUrls: ['./note-not-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteNotCreatedComponent {
  @Output() noteCreated = new EventEmitter<Note>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService,
    private chromeApiBridgeService: ChromeApiBridgeService,
  ) {
  }

  async savePage() {
    const note = await this.notesService.create().toPromise();

    const currentTab = await this.chromeApiBridgeService.getCurrentTab().toPromise();

    const updatedNote = await this.notesService.update(note.id, {
      title: 'foobar',
      content: '',
      webPageUrl: currentTab.url,
    }).toPromise();

    this.noteCreated.emit(updatedNote);
  }
}
