import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateNoteComponent } from './create-note/create-note.component';

@Injectable()
export class NotesDialogService {
  defaultConfig: MatDialogConfig<any> = {
    width: '1000px'
  };

  constructor(private dialogService: MatDialog) {

  }

  openCreateDialog() {
    return this.dialogService.open(CreateNoteComponent, {...this.defaultConfig});
  }
}
