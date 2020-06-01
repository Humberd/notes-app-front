import { GroupModificationStrategy } from '@web-app/app/dialogs/modules/group-modification-dialog/strategies/group-modification-strategy';
import { GroupModificationDialogData } from '@web-app/app/dialogs/modules/group-modification-dialog/models/group-modification-dialog-data';
import { GroupModificationDialogFormValues } from '@web-app/app/dialogs/modules/group-modification-dialog/models/group-modification-dialog-form-values';
import { FormControllerConfig } from '@ng-boost/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GroupDomainService } from '@domain/entity/group/service/group-domain.service';

export class GroupCreateStrategy implements GroupModificationStrategy {
  constructor(groupDomainService: GroupDomainService) {

  }

  generateFormDefinition(dialogData: GroupModificationDialogData): FormControllerConfig<GroupModificationDialogFormValues> {
    return {
      name: new FormControl(''),
    };
  }

  getSubmitButton(): string {
    return 'Create';
  }

  getTitle(): string {
    return 'Create Group';
  }

  handleSubmit(dialogData: GroupModificationDialogData, formValues: GroupModificationDialogFormValues): Observable<any> {
    return of(1);
  }

}
