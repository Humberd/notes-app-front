import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../models/note';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { TagsRefresherService } from '../../_services/tags-refresher.service';
import { NoteOptionsController } from '../../../../shared/common/note-options/note-options';
import { OptionConfig } from '../../../../shared/common/optionConfig';
import { DataAccessService } from '../../../../core/data-access-layers/data-access.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
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

}
