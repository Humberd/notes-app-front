import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteView } from '@domain/entity/note/view/note-view';
import { ChromeMessageMultiplexerService } from '@composite-library/lib/chrome/message-multiplexer/chrome-message-multiplexer.service';
import { ChromeMessageType } from '@composite-library/lib/chrome/message-multiplexer/model/message-type';

@Component({
  selector: 'brx-note-not-created',
  templateUrl: './note-not-created.component.html',
  styleUrls: ['./note-not-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteNotCreatedComponent {
  @Output() noteCreated = new EventEmitter<NoteView>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteDomainService: NoteDomainService,
    private chromeApiBridgeService: ChromeApiBridgeService,
    private chromeMessageMultiplexerService: ChromeMessageMultiplexerService,
  ) {
  }

  async savePage() {
    const currentTab = await this.chromeApiBridgeService.getCurrentTab().toPromise();

    const newNote = await this.noteDomainService.create({
      title: currentTab.title,
      url: currentTab.url,
    }).toPromise();

    this.noteCreated.emit(newNote);
    this.chromeMessageMultiplexerService.sendMessage(ChromeMessageType.NOTE_CREATED, {
      note: newNote,
    });
  }
}
