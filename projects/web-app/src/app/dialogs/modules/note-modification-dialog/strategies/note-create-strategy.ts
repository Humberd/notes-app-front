import { NoteModificationStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-modification-strategy';
import { NoteModificationDialogFormValues } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-midification-dialog-form-values';
import { Observable } from 'rxjs';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { FormControllerConfig } from '@ng-boost/core';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';
import { FormControl } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';

export class NoteCreateStrategy implements NoteModificationStrategy {
  constructor(private noteDomainService: NoteDomainService) {
  }

  getTitle(): string {
    return 'New Note';
  }

  getSubmitButton(): string {
    return 'Create';
  }

  generateFormDefinition(dialogData: NoteModificationDialogData): FormControllerConfig<NoteModificationDialogFormValues> {
    return {
      title: new FormControl('', FormValidators.note.title),
      url: new FormControl('', FormValidators.note.url),
      content: new FormControl('', FormValidators.note.content),
      tags: new FormControl([], []),
      workspaceIds: new FormControl([], []),
    };
  }

  handleSubmit(dialogData: NoteModificationDialogData, formValues: NoteModificationDialogFormValues): Observable<any> {
    return this.noteDomainService.create({
      title: formValues.title,
      url: formValues.url || null,
      content: formValues.content || null,
      tags: formValues.tags.map(tagName => ({name: tagName})),
      workspaces: formValues.workspaceIds.map(workspaceId => ({id: workspaceId})),
    });
  }

}
