import { Observable } from 'rxjs';
import { FormControllerConfig } from '@ng-boost/core';
import { GroupModificationDialogData } from '@web-app/app/dialogs/modules/group-modification-dialog/models/group-modification-dialog-data';
import { GroupModificationDialogFormValues } from '@web-app/app/dialogs/modules/group-modification-dialog/models/group-modification-dialog-form-values';

export interface GroupModificationStrategy {
  getTitle(): string;

  getSubmitButton(): string;

  handleSubmit(dialogData: GroupModificationDialogData, formValues: GroupModificationDialogFormValues): Observable<any>;

  generateFormDefinition(dialogData: GroupModificationDialogData): FormControllerConfig<GroupModificationDialogFormValues>;
}
