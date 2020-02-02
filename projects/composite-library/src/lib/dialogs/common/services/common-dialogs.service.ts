import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../components/confirmation-dialog/models/confirmation-dialog-data';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogResult } from '../components/confirmation-dialog/models/confirmation-dialog-result';

@Injectable()
export class CommonDialogsService {

  constructor(private matDialog: MatDialog) {
  }

  openConfirmationDialog(data: ConfirmationDialogData): MatDialogRef<ConfirmationDialogComponent, ConfirmationDialogResult> {
    return this.matDialog.open(ConfirmationDialogComponent, {data});
  }
}
