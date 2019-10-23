import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../models/note';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { IndexedDbLayerService } from '../../../../core/notes/storage/indexed-db-layer.service';
import { TagsRefresherService } from '../../_services/tags-refresher.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent {
  @Input() note: Note;

  constructor(
    private notesRefresherService: NotesRefresherService,
    private indexedDbLayerService: IndexedDbLayerService,
    private tagsRefresherService: TagsRefresherService,
  ) {

  }

  starNote() {
    this.indexedDbLayerService.star(this.note.id)
      .subscribe(newNote => {
        this.notesRefresherService.refresh();
      });
  }

  unstarNote() {
    this.indexedDbLayerService.unstar(this.note.id)
      .subscribe(newNote => {
        this.notesRefresherService.refresh();
      });
  }

  deleteNote() {
    this.indexedDbLayerService.delete(this.note.id)
      .subscribe(newNote => {
        this.notesRefresherService.refresh();
      });
  }

  restoreNote() {
    this.indexedDbLayerService.undelete(this.note.id)
      .subscribe(newNote => {
        this.notesRefresherService.refresh();
      });
  }

  deleteNotePermanently() {
    this.indexedDbLayerService.forceDelete(this.note.id)
      .subscribe(() => {
        this.notesRefresherService.refresh();
        this.tagsRefresherService.refresh();
      });
  }

  duplicateNote() {
    this.indexedDbLayerService.duplicate(this.note.id)
      .subscribe(newNote => {
        this.notesRefresherService.refresh();
        this.tagsRefresherService.refresh();
      });
  }
}
