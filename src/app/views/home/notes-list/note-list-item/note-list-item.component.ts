import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../models/note';
import { NoteOptionsController } from '../../../../shared/common/note-options/note-options';
import { OptionConfig } from '../../../../shared/common/optionConfig';
import { AppRoutingHelperService } from '../../../../shared/common/_services/app-routing-helper.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteOptionsController],
})
export class NoteListItemComponent {
  @Input() note: Note;

  noteOptions: OptionConfig<Note>[];

  constructor(
    private noteOptionsController: NoteOptionsController,
    private appRoutingHelperService: AppRoutingHelperService,
  ) {

    this.noteOptions = noteOptionsController.getOptions();
  }

  replaceNoteId(): string {
    return this.appRoutingHelperService.replaceNoteIdInPath(this.note.id);
  }

}
