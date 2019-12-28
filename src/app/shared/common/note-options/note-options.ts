import { NotesRefresherService } from '../../../views/home/_services/notes-refresher.service';
import { TagsRefresherService } from '../../../views/home/_services/tags-refresher.service';
import { Note } from '../../../models/note';
import { OptionConfig } from '../optionConfig';
import { DataAccessService } from '../../../core/data-access-layers/data-access.service';
import { CurrentNoteRefresherService } from '../../../views/home/_services/current-note-refresher.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NoteOptionsController {
  constructor(
    private notesRefresherService: NotesRefresherService,
    private dataAccessService: DataAccessService,
    private tagsRefresherService: TagsRefresherService,
    private currentNoteRefresherService: CurrentNoteRefresherService,
  ) {

  }

  getOptions(): OptionConfig<Note>[] {
    return [
      {
        icon: 'file_copy',
        labelTK: 'common.duplicate',
        showWhen: note => !note.isDeleted,
        action: note => this.dataAccessService.duplicate(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
            this.tagsRefresherService.refresh();
          }),
      },
      {
        icon: 'star_border',
        labelTK: 'common.star',
        showWhen: note => !note.isDeleted && !note.isStarred,
        action: note => this.dataAccessService.star(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
            if (this.currentNoteRefresherService.data.id === newNote.id) {
              this.currentNoteRefresherService.refresh();
            }
          }),
      },
      {
        icon: 'star',
        labelTK: 'common.unstar',
        showWhen: note => !note.isDeleted && note.isStarred,
        action: note => this.dataAccessService.unstar(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
            if (this.currentNoteRefresherService.data.id === newNote.id) {
              this.currentNoteRefresherService.refresh();
            }
          }),
      },
      {
        icon: 'delete',
        labelTK: 'common.delete',
        dividerAbove: true,
        showWhen: note => !note.isDeleted,
        action: note => this.dataAccessService.delete(note.id)
          .subscribe(newNote => {
            this.notesRefresherService.refresh();
          }),
      },
      {
        icon: 'restore_from_trash',
        labelTK: 'common.restore',
        showWhen: note => note.isDeleted,
        action: note => this.dataAccessService.undelete(note.id)
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
        action: note => this.dataAccessService.forceDelete(note.id)
          .subscribe(() => {
            this.notesRefresherService.refresh();
            this.tagsRefresherService.refresh();
          }),
      },
    ];
  }
}
