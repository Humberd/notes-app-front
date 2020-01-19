import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTagDialogComponent } from '../components/edit-tag-dialog/edit-tag-dialog.component';

@Injectable()
export class TagDialogsService {

  constructor(private dialog: MatDialog) {
  }

  openEditTagDialog() {
    return this.dialog.open(EditTagDialogComponent);
  }
}
