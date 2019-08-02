import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateNoteComponent } from './create-note/create-note.component';

@Injectable()
export class NotesDialogService {

  constructor(private dialogService: MatDialog) {

  }

  openCreateDialog() {
    return this.dialogService.open(CreateNoteComponent);
  }
}
