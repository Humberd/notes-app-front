import { NoteModificationStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-modification-strategy';
import { NoteModificationDialogFormValues } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-midification-dialog-form-values';
import { Observable } from 'rxjs';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { FormControllerConfig } from '@ng-boost/core';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';
import { FormControl } from '@angular/forms';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';

export class NewNoteStrategy implements NoteModificationStrategy {

  constructor(private noteDomainService: NoteDomainService) {
  }

  getTitle(): string {
    return 'New Note';
  }

  getSubmitButton(): string {
    return 'Create';
  }

  handleSubmit(formValues: NoteModificationDialogFormValues): Observable<any> {
    return this.noteDomainService.create({
      title: formValues.title,
      url: formValues.url,
      content: formValues.content,
    });
  }

  generateFormDefinition(dialogData: NoteModificationDialogData): FormControllerConfig<NoteModificationDialogFormValues> {
    return {
      title: new FormControl('', FormValidators.note.title),
      url: new FormControl('', FormValidators.note.url),
      content: new FormControl('', FormValidators.note.content),
    };
  }

}
