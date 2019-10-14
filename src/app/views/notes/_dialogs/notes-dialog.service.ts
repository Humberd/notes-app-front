import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { EditNoteDialogComponent, EditNoteDialogData } from './edit-note-dialog/edit-note-dialog.component';
import { DeleteNoteDialogComponent } from './delete-note-dialog/delete-note-dialog.component';
import { NoteDto } from '../_models/notes';

@Injectable()
export class NotesDialogService {
  defaultConfig: MatDialogConfig<any> = {
    width: '500px',
  };

  constructor(private dialogService: MatDialog) {

  }

  openCreateDialog() {
    return this.dialogService.open(CreateNoteDialogComponent, {...this.defaultConfig, width: '1000px'});
  }

  openEditDialog(data: EditNoteDialogData) {
    return this.dialogService.open(EditNoteDialogComponent, {...this.defaultConfig, width: '1000px', data});
  }

  openDeleteDialog(data: NoteDto) {
    return this.dialogService.open(DeleteNoteDialogComponent, {...this.defaultConfig, data});
  }
}
