import { WorkspaceModificationStrategy } from '@web-app/app/dialogs/modules/workspace-modification-dialog/strategies/workspace-modification-strategy';
import { WorkspaceModificationDialogData } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-data';
import { WorkspaceModificationDialogFormValues } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-form-values';
import { FormControllerConfig } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';
import { WorkspaceDomainService } from '@domain/entity/workspace/service/workspace-domain.service';

export class WorkspaceCreateStrategy implements WorkspaceModificationStrategy {
  constructor(private workspaceDomainService: WorkspaceDomainService) {
  }

  generateFormDefinition(dialogData: WorkspaceModificationDialogData): FormControllerConfig<WorkspaceModificationDialogFormValues> {
    return {
      name: new FormControl('', FormValidators.workspace.name),
    };
  }

  getSubmitButton(): string {
    return 'Create';
  }

  getTitle(): string {
    return 'New Workspace';
  }

  handleSubmit(dialogData: WorkspaceModificationDialogData, formValues: WorkspaceModificationDialogFormValues): Observable<any> {
    return this.workspaceDomainService.create({
      name: formValues.name,
    });
  }
}
