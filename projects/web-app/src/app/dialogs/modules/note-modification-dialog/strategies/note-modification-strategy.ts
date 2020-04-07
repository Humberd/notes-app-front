import { NoteModificationDialogFormValues } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-midification-dialog-form-values';
import { Observable } from 'rxjs';
import { FormControllerConfig } from '@ng-boost/core';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';

export interface NoteModificationStrategy {
  getTitle(): string;

  getSubmitButton(): string;

  handleSubmit(dialogData: NoteModificationDialogData, formValues: NoteModificationDialogFormValues): Observable<any>;

  generateFormDefinition(dialogData: NoteModificationDialogData): FormControllerConfig<NoteModificationDialogFormValues>;
}
