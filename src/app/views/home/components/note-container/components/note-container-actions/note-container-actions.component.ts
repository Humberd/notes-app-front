import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../../../domains/note/models/note';
import { OptionConfig } from '../../../../../../shared/common/optionConfig';
import { NoteOptionsController } from '../../../../../../shared/common/note-options/note-options';

@Component({
  selector: 'app-note-container-actions',
  templateUrl: './note-container-actions.component.html',
  styleUrls: ['./note-container-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteOptionsController],
})
export class NoteContainerActionsComponent {
  @Input() note: Note;
  noteOptions: OptionConfig<Note>[];

  constructor(
    private noteOptionsController: NoteOptionsController,
  ) {

    this.noteOptions = noteOptionsController.getOptions();
  }

  trackBy(index: number, item: OptionConfig<Note>) {
    return item.icon;
  }

}
