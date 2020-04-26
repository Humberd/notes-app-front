import { WorkspaceModificationDialogData } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-data';
import { WorkspaceModificationDialogFormValues } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-form-values';
import { Observable } from 'rxjs';
import { FormControllerConfig } from '@ng-boost/core';

export interface WorkspaceModificationStrategy {
  getTitle(): string;

  getSubmitButton(): string;

  handleSubmit(dialogData: WorkspaceModificationDialogData, formValues: WorkspaceModificationDialogFormValues): Observable<any>;

  generateFormDefinition(dialogData: WorkspaceModificationDialogData): FormControllerConfig<WorkspaceModificationDialogFormValues>;
}
