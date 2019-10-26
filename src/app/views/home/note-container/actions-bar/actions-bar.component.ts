import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../models/note';
import { NoteOptionsController } from '../../../../shared/common/note-options/note-options';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { TagsRefresherService } from '../../_services/tags-refresher.service';
import { OptionConfig } from '../../../../shared/common/optionConfig';
import { DataAccessService } from '../../../../core/data-access-layers/data-access.service';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsBarComponent {
  @Input() note: Note;

  noteOptions: OptionConfig<Note>[];

  constructor(
    private notesRefresherService: NotesRefresherService,
    private dataAccessService: DataAccessService,
    private tagsRefresherService: TagsRefresherService,
  ) {
    const noteOptionsController = new NoteOptionsController(notesRefresherService, dataAccessService, tagsRefresherService);

    this.noteOptions = noteOptionsController.getOptions();
  }

  trackBy(index: number, item: OptionConfig<Note>) {
    return item.icon;
  }

}
