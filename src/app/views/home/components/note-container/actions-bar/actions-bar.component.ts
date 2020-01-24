import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NoteOptionsController } from '../../../../../shared/common/note-options/note-options';
import { OptionConfig } from '../../../../../shared/common/optionConfig';
import { Note } from '../../../../../domains/note/models/note';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NoteOptionsController],
})
export class ActionsBarComponent {
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
