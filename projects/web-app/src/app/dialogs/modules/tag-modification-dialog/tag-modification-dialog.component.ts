import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TagModificationDialogData } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { TagModificationDialogFormValues } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-form-values';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { TagModificationStrategy } from '@web-app/app/dialogs/modules/tag-modification-dialog/strategies/tag-modification-strategy';
import { TagEditStrategy } from '@web-app/app/dialogs/modules/tag-modification-dialog/strategies/tag-edit-strategy';
import { TagCreateStrategy } from '@web-app/app/dialogs/modules/tag-modification-dialog/strategies/tag-create-strategy';
import { Observable } from 'rxjs';
import { ColorPickerService } from 'ngx-color-picker';

@Component({
  selector: 'app-tag-modification-dialog',
  templateUrl: './tag-modification-dialog.component.html',
  styleUrls: ['./tag-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ColorPickerService,
  ],
})
export class TagModificationDialogComponent extends FormRootController<TagModificationDialogFormValues> {
  readonly strategy: TagModificationStrategy;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: TagModificationDialogData,
    private matDialogRef: MatDialogRef<TagModificationDialogComponent>,
    private tagDomainService: TagDomainService,
  ) {
    super();

    if (this.dialogData?.editedTag) {
      this.strategy = new TagEditStrategy(tagDomainService);
    } else {
      this.strategy = new TagCreateStrategy(tagDomainService);
    }
  }

  getFormDefinition(): FormControllerConfig<TagModificationDialogFormValues> {
    return this.strategy.generateFormDefinition(this.dialogData);
  }

  protected submitAction(values: TagModificationDialogFormValues): Observable<any> {
    return this.strategy.handleSubmit(this.dialogData, values);
  }

  protected onSuccess(success: any): void {
    this.matDialogRef.close(success);
  }
}
