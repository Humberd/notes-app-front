import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { SaveWebsiteFormValues } from './models/save-website-form-values';
import { FormControl, FormGroup } from '@angular/forms';
import { AutocompleteInputFormValues } from 'composite-library/lib/forms/autocomplete-input/models/autocomplete-input-form-values';
import { AutocompleteInputFormComponent } from 'composite-library/lib/forms/autocomplete-input/autocomplete-input-form.component';
import { SaveWebsiteFormInitialValues } from 'composite-library/lib/forms/save-website-form/models/save-website-form-initial-values';

@Component({
  selector: 'lib2-save-website-form',
  templateUrl: './save-website-form.component.html',
  styleUrls: ['./save-website-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveWebsiteFormComponent extends FormController<SaveWebsiteFormValues, SaveWebsiteFormInitialValues> {
  @ViewChild(AutocompleteInputFormComponent) autoCompleteInputFormComponent: AutocompleteInputFormComponent;

  @Output() tagAdd = new EventEmitter<string>();
  @Output() tagDelete = new EventEmitter<string>();

  @Input() allTagNames: string[];

  tagNames: string[] = [];

  getFormDefinition(): FormControllerConfig<SaveWebsiteFormValues> {
    this.tagNames = [...this.initialValues.tagNames];

    return {
      title: new FormControl(this.initialValues?.title),
      newTag: new FormGroup({}),
    };
  }

  addTag() {
    const newTagValues: AutocompleteInputFormValues = this.formDefinition.newTag.value;
    const newTagName = newTagValues.value;

    this.tagNames.push(newTagName);
    this.autoCompleteInputFormComponent.resetForm();
    this.tagAdd.emit(newTagName);
  }

  removeTag(tagName: string) {
    this.tagNames = this.tagNames.filter(it => it !== tagName);
    this.tagDelete.emit(tagName);
  }

}
