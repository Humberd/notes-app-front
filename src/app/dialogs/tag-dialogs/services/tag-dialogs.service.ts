import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagEditDialogComponent } from '../components/edit-tag-dialog/tag-edit-dialog.component';
import { TagEditDialogData } from '../components/edit-tag-dialog/models/tag-edit-dialog-data';

@Injectable()
export class TagDialogsService {

  constructor(private dialog: MatDialog) {
  }

  openEditTagDialog(data: TagEditDialogData) {
    return this.dialog.open(TagEditDialogComponent, {data});
  }
}
