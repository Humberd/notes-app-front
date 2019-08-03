import { Component, Inject } from '@angular/core';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { NoteFormValues } from '../note-form/note-form.component';
import { NotesHttpService } from '../../_services/notes-http.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoteDto } from '../../_models/notes';

interface EditNoteDialogFormValues {
  form: NoteFormValues;
}

export type EditNoteDialogData = NoteDto;

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent extends FormRootController<EditNoteDialogFormValues> {
  noteFormInitialValues: NoteFormValues;

  constructor(
    private notesHttpService: NotesHttpService,
    private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private dialogData?: EditNoteDialogData
  ) {
    super();

    this.noteFormInitialValues = {
      title: this.dialogData.title,
      content: this.dialogData.content,
      tags: this.dialogData.tags.map(
        it => it.displayName)
    };
  }


  getFormDefinition(): FormControllerConfig<EditNoteDialogFormValues> {
    return {
      form: new FormGroup({})
    };
  }

  protected submitAction(values: EditNoteDialogFormValues): Observable<any> {
    return this.notesHttpService.update(this.dialogData.id, {
      title: values.form.title,
      content: values.form.content,
      tags: values.form.tags
    });
  }

  protected onSuccess(success: any): void {
    this.matDialogRef.close();
  }

}
