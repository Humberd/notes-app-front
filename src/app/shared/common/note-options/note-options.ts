import { OptionConfig } from '../optionConfig';
import { CurrentNoteRefresherService } from '../../../views/home/_services/current-note-refresher.service';
import { Injectable } from '@angular/core';
import { Note } from '../../../domains/note/models/note';
import { NotesService } from '../../../domains/note/services/notes.service';

@Injectable()
export class NoteOptionsController {
  constructor(
    private notesService: NotesService,
    private currentNoteRefresherService: CurrentNoteRefresherService,
  ) {

  }

  getOptions(): OptionConfig<Note>[] {
    return [
      {
        icon: 'file_copy',
        labelTK: 'common.duplicate',
        showWhen: note => !note.isDeleted,
        action: note => this.notesService.duplicate(note.id)
          .subscribe(),
      },
      {
        icon: 'star_border',
        labelTK: 'common.star',
        showWhen: note => !note.isDeleted && !note.isStarred,
        action: note => this.notesService.star(note.id)
          .subscribe(newNote => {
            if (this.currentNoteRefresherService.data.id === newNote.id) {
              this.currentNoteRefresherService.refresh();
            }
          }),
      },
      {
        icon: 'star',
        labelTK: 'common.unstar',
        showWhen: note => !note.isDeleted && note.isStarred,
        action: note => this.notesService.unstar(note.id)
          .subscribe(newNote => {
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
        action: note => this.notesService.delete(note.id)
          .subscribe(),
      },
      {
        icon: 'restore_from_trash',
        labelTK: 'common.restore',
        showWhen: note => note.isDeleted,
        action: note => this.notesService.undelete(note.id)
          .subscribe(),
      },
      {
        icon: 'delete_forever',
        iconColor: 'warn',
        labelTK: 'common.delete_permanently',
        dividerAbove: true,
        showWhen: note => note.isDeleted,
        action: note => this.notesService.forceDelete(note.id)
          .subscribe(),
      },
    ];
  }
}
