import { OptionConfig } from '../optionConfig';
import { Injectable } from '@angular/core';
import { Note } from '../../../domains/note/models/note';
import { NotesService } from '../../../domains/note/services/notes.service';
import { AppRoutingHelperService } from '../_services/app-routing-helper.service';
import { Router } from '@angular/router';

@Injectable()
export class NoteOptionsController {
  constructor(
    private notesService: NotesService,
    private appRoutingHelperService: AppRoutingHelperService,
    private router: Router,
  ) {

  }

  getOptions(): OptionConfig<Note>[] {
    return [
      {
        icon: 'file_copy',
        labelTK: 'common.duplicate',
        showWhen: note => !note.isDeleted,
        action: note => this.notesService.duplicate(note.id)
          .subscribe(duplicatedNote => this.appRoutingHelperService.updateNotePath(duplicatedNote.id),
            console.error, () => console.log('completed')),
      },
      {
        icon: 'star_border',
        labelTK: 'common.star',
        showWhen: note => !note.isDeleted && !note.isStarred,
        action: note => this.notesService.star(note.id)
          .subscribe(),
      },
      {
        icon: 'star',
        labelTK: 'common.unstar',
        showWhen: note => !note.isDeleted && note.isStarred,
        action: note => this.notesService.unstar(note.id)
          .subscribe(),
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
