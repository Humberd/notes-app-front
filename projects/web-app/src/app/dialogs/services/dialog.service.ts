import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteModificationDialogComponent } from '@web-app/app/dialogs/modules/note-modification-dialog/note-modification-dialog.component';
import { NoteModificationDialogOutput } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-output';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  async openCreateNoteDialog() {
    const {NoteModificationDialogModule} = await import('../modules/note-modification-dialog/note-modification-dialog.module');
    return this.matDialog.open<NoteModificationDialogComponent, NoteModificationDialogData, NoteModificationDialogOutput>(
      NoteModificationDialogModule.getDialogClass(),
    );
  }

  async openEditNoteDialog(dialogData: NoteModificationDialogData) {
    const {NoteModificationDialogModule} = await import('../modules/note-modification-dialog/note-modification-dialog.module');
    return this.matDialog.open<NoteModificationDialogComponent, NoteModificationDialogData, NoteModificationDialogOutput>(
      NoteModificationDialogModule.getDialogClass(),
      {
        data: dialogData,
      },
    );
  }
}
