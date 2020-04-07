import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '@web-app/app/dialogs/modules/confirmation-dialog/models/confirmation-dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ConfirmationDialogData,
    private matDialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
  }

  confirm() {
    this.dialogData.confirm.action()
      .subscribe(() => this.matDialogRef.close(true));
  }
}
