import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagEditDialogData } from './models/tag-edit-dialog-data';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { TagEditDialogFormValues } from './models/tag-edit-dialog-form-values';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { TagsService } from '../../../../../../projects/domains/src/lib/tag/services/tags.service';

@Component({
  selector: 'app-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagEditDialogComponent extends FormRootController<TagEditDialogFormValues> {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: TagEditDialogData,
    private matDialogRef: MatDialogRef<any>,
    private tagsService: TagsService,
  ) {
    super();
  }

  getFormDefinition(): FormControllerConfig<TagEditDialogFormValues> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: TagEditDialogFormValues): Observable<any> {
    return this.tagsService.update(this.dialogData.id, {
      name: values.form.name,
      colorHex: values.form.colorHex || undefined,
    });
  }

  protected onSuccess(success: any): void {
    this.matDialogRef.close('ok');
  }
}
