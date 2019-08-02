import { Component } from '@angular/core';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { NotesHttpService } from '../../_services/notes-http.service';

interface CreateNoteFormValues {
  title: string;
  content: string;
  tags: string[];
}

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent extends FormRootController<CreateNoteFormValues> {

  constructor(private notesHttpService: NotesHttpService) {
    super();
  }


  getFormDefinition(): FormControllerConfig<CreateNoteFormValues> {
    return {
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
      tags: new FormControl([])
    };
  }

  protected submitAction(values: CreateNoteFormValues): Observable<any> {
    return this.notesHttpService.create({
      title: values.title,
      content: values.content,
      tags: values.tags
    });
  }

}
