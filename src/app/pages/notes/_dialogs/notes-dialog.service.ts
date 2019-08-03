import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { EditNoteDialogComponent, EditNoteDialogData } from './edit-note-dialog/edit-note-dialog.component';

@Injectable()
export class NotesDialogService {
  defaultConfig: MatDialogConfig<any> = {
    width: '1000px'
  };

  constructor(private dialogService: MatDialog) {

  }

  openCreateDialog() {
    return this.dialogService.open(CreateNoteDialogComponent, {...this.defaultConfig});
  }

  openEditDialog(data: EditNoteDialogData) {
    return this.dialogService.open(EditNoteDialogComponent, {...this.defaultConfig, data});
  }
}
