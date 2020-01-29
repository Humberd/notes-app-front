import { OptionConfig } from '../optionConfig';
import { Injectable } from '@angular/core';
import { Note } from '../../../../../projects/domains/src/lib/note/models/note';
import { NotesService } from '../../../../../projects/domains/src/lib/note/services/notes.service';
import { AppRoutingHelperService } from '../_services/app-routing-helper.service';

@Injectable()
export class NoteOptionsController {
  constructor(
    private notesService: NotesService,
    private appRoutingHelperService: AppRoutingHelperService,
  ) {

  }

  getOptions(): OptionConfig<Note>[] {
    return [
      {
        icon: 'file_copy',
        label: 'common.duplicate',
        showWhen: note => !note.isDeleted,
        action: note => this.notesService.duplicate(note.id)
          .subscribe(duplicatedNote => this.appRoutingHelperService.updateNotePath(duplicatedNote.id)),
      },
      {
        icon: 'star_border',
        label: 'common.star',
        showWhen: note => !note.isDeleted && !note.isStarred,
        action: note => this.notesService.star(note.id)
          .subscribe(),
      },
      {
        icon: 'star',
        label: 'common.unstar',
        showWhen: note => !note.isDeleted && note.isStarred,
        action: note => this.notesService.unstar(note.id)
          .subscribe(),
      },
      {
        icon: 'delete',
        label: 'common.delete',
        dividerAbove: true,
        showWhen: note => !note.isDeleted,
        action: note => this.notesService.delete(note.id)
          .subscribe(),
      },
      {
        icon: 'restore_from_trash',
        label: 'common.restore',
        showWhen: note => note.isDeleted,
        action: note => this.notesService.undelete(note.id)
          .subscribe(),
      },
      {
        icon: 'delete_forever',
        iconColor: 'warn',
        label: 'common.delete_permanently',
        dividerAbove: true,
        showWhen: note => note.isDeleted,
        action: note => this.notesService.forceDelete(note.id)
          .subscribe(),
      },
    ];
  }
}
