import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChromeApiBridgeService } from '@composite-library/lib/browser-extension/chrome-api/services/chrome-api-bridge.service';

@Component({
  selector: 'brx-note-not-created',
  templateUrl: './note-not-created.component.html',
  styleUrls: ['./note-not-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteNotCreatedComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chromeApiBridgeService: ChromeApiBridgeService,
  ) {
  }

  async savePage() {
    // const note = await this.notesService.create().toPromise();
    //
    // const currentTab = await this.chromeApiBridgeService.getCurrentTab().toPromise();
    //
    // const updatedNote = await this.notesService.update(note.id, {
    //   title: currentTab.title,
    //   content: '',
    //   webPageUrl: currentTab.url,
    // }).toPromise();
    //
    // this.noteCreated.emit(updatedNote);
  }
}
