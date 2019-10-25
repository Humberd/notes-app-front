import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../models/note';
import { NoteOptionsController } from '../../../../shared/common/note-options/note-options';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { IndexedDbLayerService } from '../../../../core/notes/storage/indexed-db-layer.service';
import { TagsRefresherService } from '../../_services/tags-refresher.service';
import { OptionConfig } from '../../../../shared/common/optionConfig';

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
    private indexedDbLayerService: IndexedDbLayerService,
    private tagsRefresherService: TagsRefresherService,
  ) {
    const noteOptionsController = new NoteOptionsController(notesRefresherService, indexedDbLayerService, tagsRefresherService);

    this.noteOptions = noteOptionsController.getOptions();
  }

  trackBy(index: number, item: OptionConfig<Note>) {
    return item.icon;
  }

}
