import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagEditDialogData } from './models/tag-edit-dialog-data';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { TagEditDialogFormValues } from './models/tag-edit-dialog-form-values';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib2-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagEditDialogComponent extends FormRootController<TagEditDialogFormValues> {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: TagEditDialogData,
    private matDialogRef: MatDialogRef<any>,
  ) {
    super();
  }

  getFormDefinition(): FormControllerConfig<TagEditDialogFormValues> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: TagEditDialogFormValues): Observable<any> {
    return of()
  }

  protected onSuccess(success: any): void {
    this.matDialogRef.close('ok');
  }
}
