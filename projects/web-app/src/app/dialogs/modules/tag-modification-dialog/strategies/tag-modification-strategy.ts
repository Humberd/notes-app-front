import { Observable } from 'rxjs';
import { FormControllerConfig } from '@ng-boost/core';
import { TagModificationDialogData } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-data';
import { TagModificationDialogFormValues } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-form-values';

export interface TagModificationStrategy {
  getTitle(): string;

  getSubmitButton(): string;

  handleSubmit(dialogData: TagModificationDialogData, formValues: TagModificationDialogFormValues): Observable<any>;

  generateFormDefinition(dialogData: TagModificationDialogData): FormControllerConfig<TagModificationDialogFormValues>;

}
