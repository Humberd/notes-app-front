import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkspaceModificationDialogData } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-data';
import { WorkspaceModificationStrategy } from '@web-app/app/dialogs/modules/workspace-modification-dialog/strategies/workspace-modification-strategy';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { WorkspaceModificationDialogFormValues } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-form-values';
import { WorkspaceDomainService } from '@domain/entity/workspace/service/workspace-domain.service';
import { WorkspaceEditStrategy } from '@web-app/app/dialogs/modules/workspace-modification-dialog/strategies/workspace-edit-strategy';
import { WorkspaceCreateStrategy } from '@web-app/app/dialogs/modules/workspace-modification-dialog/strategies/workspace-create-strategy';
import { Observable } from 'rxjs';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';

@Component({
  selector: 'app-workspace-modification-dialog',
  templateUrl: './workspace-modification-dialog.component.html',
  styleUrls: ['./workspace-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceModificationDialogComponent extends FormRootController<WorkspaceModificationDialogFormValues> {
  readonly strategy: WorkspaceModificationStrategy;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: WorkspaceModificationDialogData,
    private dialogRef: MatDialogRef<WorkspaceModificationDialogComponent>,
    private workspaceDomainService: WorkspaceDomainService,
  ) {
    super();

    if (this.dialogData?.editedWorkspace) {
      this.strategy = new WorkspaceEditStrategy(this.workspaceDomainService);
    } else {
      this.strategy = new WorkspaceCreateStrategy(this.workspaceDomainService);
    }
  }

  getFormDefinition(): FormControllerConfig<WorkspaceModificationDialogFormValues> {
    return this.strategy.generateFormDefinition(this.dialogData);
  }

  protected submitAction(values: WorkspaceModificationDialogFormValues): Observable<any> {
    return this.strategy.handleSubmit(this.dialogData, values);
  }

  protected onSuccess(success: WorkspaceView): void {
    this.dialogRef.close(success);
  }
}
