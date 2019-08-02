import { Component } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { FormControl, Validators } from '@angular/forms';
import { TagsHttpService } from '../../_services/tags-http.service';
import { map } from 'rxjs/operators';

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
  tagNames: string[] = [];

  constructor(private tagsHttpService: TagsHttpService) {
    super();
  }

  getFormDefinition(): FormControllerConfig<NoteFormValues> {
    return {
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
      tags: new FormControl([])
    };
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    super.ngOnInit();

    this.tagsHttpService.readAll()
      .pipe(
        map(tags => tags.map(it => it.displayName))
      )
      .subscribe(tagNames => this.tagNames = tagNames);
  }
}
