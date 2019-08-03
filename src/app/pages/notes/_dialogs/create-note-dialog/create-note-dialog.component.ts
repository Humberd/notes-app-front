import { Component } from '@angular/core';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { NotesHttpService } from '../../_services/notes-http.service';
import { NoteFormValues } from '../note-form/note-form.component';

interface CreateNoteFormValues {
  form: NoteFormValues;
}

@Component({
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.scss']
})
export class CreateNoteDialogComponent extends FormRootController<CreateNoteFormValues> {

  constructor(private notesHttpService: NotesHttpService) {
    super();
  }


  getFormDefinition(): FormControllerConfig<CreateNoteFormValues> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: CreateNoteFormValues): Observable<any> {
    return this.notesHttpService.create({
      title: values.form.title,
      content: values.form.content,
      tags: values.form.tags
    });
  }

}
