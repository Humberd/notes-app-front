import { Component } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { FormControl, Validators } from '@angular/forms';

export interface NoteFormValues {
  title: string;
  content: string;
  tags: string[];
}

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent extends FormController<NoteFormValues> {
  getFormDefinition(): FormControllerConfig<NoteFormValues> {
    return {
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
      tags: new FormControl([])
    };
  }


}
