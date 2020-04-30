import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { TagModificationStrategy } from '@web-app/app/dialogs/modules/tag-modification-dialog/strategies/tag-modification-strategy';
import { TagModificationDialogData } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-data';
import { Observable } from 'rxjs';
import { TagModificationDialogFormValues } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-form-values';
import { FormControllerConfig } from '@ng-boost/core';
import { FormControl } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';

export class TagCreateStrategy implements TagModificationStrategy {
  constructor(private tagDomainService: TagDomainService) {
  }

  getTitle(): string {
    return 'New Tag';
  }

  getSubmitButton(): string {
    return 'Create';
  }

  generateFormDefinition(dialogData: TagModificationDialogData): FormControllerConfig<TagModificationDialogFormValues> {
    return {
      name: new FormControl('', FormValidators.tag.name),
      backgroundColor: new FormControl('', FormValidators.tag.backgroundColor),
    };
  }

  handleSubmit(dialogData: TagModificationDialogData, formValues: TagModificationDialogFormValues): Observable<any> {
    return this.tagDomainService.create({
      name: formValues.name,
      backgroundColor: formValues.backgroundColor,
    });
  }

}
