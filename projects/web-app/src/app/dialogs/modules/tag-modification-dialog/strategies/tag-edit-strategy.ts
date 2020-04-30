import { TagModificationStrategy } from '@web-app/app/dialogs/modules/tag-modification-dialog/strategies/tag-modification-strategy';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { TagModificationDialogData } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-data';
import { FormControllerConfig } from '@ng-boost/core';
import { TagModificationDialogFormValues } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-form-values';
import { FormControl } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';
import { Observable } from 'rxjs';

export class TagEditStrategy implements TagModificationStrategy {
  constructor(private tagDomainService: TagDomainService) {
  }

  getTitle(): string {
    return 'Edit Tag';
  }

  getSubmitButton(): string {
    return 'Save';
  }

  generateFormDefinition(dialogData: TagModificationDialogData): FormControllerConfig<TagModificationDialogFormValues> {
    return {
      name: new FormControl(dialogData.editedTag.name, FormValidators.tag.name),
      backgroundColor: new FormControl(dialogData.editedTag.backgroundColor, FormValidators.tag.backgroundColor),
    };
  }

  handleSubmit(dialogData: TagModificationDialogData, formValues: TagModificationDialogFormValues): Observable<any> {
    return this.tagDomainService.patch(dialogData.editedTag.id, {
      name: formValues.name,
      backgroundColor: formValues.backgroundColor,
    });
  }
}
