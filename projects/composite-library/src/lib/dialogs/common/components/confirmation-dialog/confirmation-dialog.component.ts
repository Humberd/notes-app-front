import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from './models/confirmation-dialog-data';
import { ConfirmationDialogResult } from './models/confirmation-dialog-result';

@Component({
  selector: 'lib2-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ConfirmationDialogData,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
  }

  confirm() {
    this.dialogRef.close(ConfirmationDialogResult.CONFIRMED);
  }

}
