import { NoteModificationStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-modification-strategy';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteModificationDialogFormValues } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-midification-dialog-form-values';
import { Observable } from 'rxjs';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';
import { FormControllerConfig } from '@ng-boost/core';
import { FormControl } from '@angular/forms';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';

export class EditNoteStrategy implements NoteModificationStrategy {
  constructor(private noteDomainService: NoteDomainService) {
  }

  getTitle(): string {
    return 'Edit Note';
  }

  getSubmitButton(): string {
    return 'Save';
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
      title: new FormControl(dialogData.editedNote.title, FormValidators.note.title),
      url: new FormControl(dialogData.editedNote.url, FormValidators.note.url),
      content: new FormControl(dialogData.editedNote.content, FormValidators.note.content),
    };
  }

}
