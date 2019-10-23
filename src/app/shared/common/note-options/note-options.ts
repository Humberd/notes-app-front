import { NotesRefresherService } from '../../../views/home/_services/notes-refresher.service';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';
import { TagsRefresherService } from '../../../views/home/_services/tags-refresher.service';
import { Note } from '../../../models/note';
import { ThemePalette } from '@angular/material';

export interface NoteOption {
  icon: string;
  iconColor?: ThemePalette;
  labelTK: string;
  showWhen: (note: Note) => boolean;
  action: (note: Note) => any;
  dividerAbove?: boolean;
}

export class NoteOptionsController {
  constructor(
    private notesRefresherService: NotesRefresherService,
    private indexedDbLayerService: IndexedDbLayerService,
    private tagsRefresherService: TagsRefresherService,
  ) {

  }

  getOptions(): NoteOption[] {
    return [
      {
        icon: 'file_copy',
        labelTK: 'common.duplicate',
        showWhen: note => !note.isDeleted,
        action: note => this.indexedDbLayerService.duplicate(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
            this.tagsRefresherService.refresh();
          }),
      },
      {
        icon: 'star_border',
        labelTK: 'common.star',
        showWhen: note => !note.isDeleted && !note.isStarred,
        action: note => this.indexedDbLayerService.star(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
          }),
      },
      {
        icon: 'star',
        labelTK: 'common.unstar',
        showWhen: note => !note.isDeleted && note.isStarred,
        action: note => this.indexedDbLayerService.unstar(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
          }),
      },
      {
        icon: 'delete',
        labelTK: 'common.delete',
        dividerAbove: true,
        showWhen: note => !note.isDeleted,
        action: note => this.indexedDbLayerService.delete(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
          }),
      },
      {
        icon: 'restore_from_trash',
        labelTK: 'common.restore',
        showWhen: note => note.isDeleted,
        action: note => this.indexedDbLayerService.undelete(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
          }),
      },
      {
        icon: 'delete_forever',
        iconColor: 'warn',
        labelTK: 'common.delete_permanently',
        dividerAbove: true,
        showWhen: note => note.isDeleted,
        action: note => this.indexedDbLayerService.forceDelete(note.id)
          .subscribe(() => {
            this.notesRefresherService.refresh();
            this.tagsRefresherService.refresh();
          }),
      },
    ];
  }
}
