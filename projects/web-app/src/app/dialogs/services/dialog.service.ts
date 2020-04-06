import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    return this.matDialog.open(NoteModificationDialogModule.getDialogClass());
  }
}
