import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { SaveWebsiteFormValues } from './models/save-website-form-values';
import { FormControl, FormGroup } from '@angular/forms';
import { TagsRefresherService } from 'composite-library/lib/services/tags-refresher.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutocompleteInputFormValues } from 'composite-library/lib/forms/autocomplete-input/models/autocomplete-input-form-values';
import { AutocompleteInputFormComponent } from 'composite-library/lib/forms/autocomplete-input/autocomplete-input-form.component';

@Component({
  selector: 'lib2-save-website-form',
  templateUrl: './save-website-form.component.html',
  styleUrls: ['./save-website-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveWebsiteFormComponent extends FormController<SaveWebsiteFormValues> implements OnInit {
  @ViewChild(AutocompleteInputFormComponent) autoCompleteInputFormComponent: AutocompleteInputFormComponent;

  allTagNames$: Observable<string[]>;

  tagNames: string[] = [];

  constructor(private tagsRefresherService: TagsRefresherService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.allTagNames$ = this.tagsRefresherService.data$
      .pipe(
        map(tags => tags.map(tag => tag.name)),
      );
  }

  getFormDefinition(): FormControllerConfig<SaveWebsiteFormValues> {
    return {
      title: new FormControl(),
      newTag: new FormGroup({}),
    };
  }

  addTag() {
    const newTagValues: AutocompleteInputFormValues = this.formDefinition.newTag.value;

    this.tagNames.push(newTagValues.value);
    this.autoCompleteInputFormComponent.resetForm();
  }

  removeTag(tagName: string) {
    this.tagNames = this.tagNames.filter(it => it !== tagName);
  }

}
