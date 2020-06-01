import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { GroupModificationStrategy } from '@web-app/app/dialogs/modules/group-modification-dialog/strategies/group-modification-strategy';
import { GroupModificationDialogData } from '@web-app/app/dialogs/modules/group-modification-dialog/models/group-modification-dialog-data';
import { GroupModificationDialogFormValues } from '@web-app/app/dialogs/modules/group-modification-dialog/models/group-modification-dialog-form-values';
import { GroupView } from '@domain/entity/group/view/group-view';
import { GroupCreateStrategy } from '@web-app/app/dialogs/modules/group-modification-dialog/strategies/group-create-strategy';
import { GroupDomainService } from '@domain/entity/group/service/group-domain.service';

@Component({
  selector: 'app-group-modification-dialog',
  templateUrl: './group-modification-dialog.component.html',
  styleUrls: ['./group-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupModificationDialogComponent extends FormRootController<GroupModificationDialogFormValues> {
  readonly strategy: GroupModificationStrategy;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: GroupModificationDialogData,
    private dialogRef: MatDialogRef<GroupModificationDialogComponent>,
    groupDomainService: GroupDomainService,
  ) {
    super();

    if (this.dialogData) {
      // this.strategy = new WorkspaceEditStrategy(this.workspaceDomainService);
    } else {
      this.strategy = new GroupCreateStrategy(groupDomainService);
    }
  }

  getFormDefinition(): FormControllerConfig<GroupModificationDialogFormValues> {
    return this.strategy.generateFormDefinition(this.dialogData);
  }

  protected submitAction(values: GroupModificationDialogFormValues): Observable<any> {
    return this.strategy.handleSubmit(this.dialogData, values);
  }

  protected onSuccess(success: GroupView): void {
    this.dialogRef.close(success);
  }

}
