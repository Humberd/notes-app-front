import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { SaveWebsiteFormValues } from './models/save-website-form-values';
import { FormControl, FormGroup } from '@angular/forms';
import { AutocompleteInputFormValues } from '@composite-library/lib/forms/autocomplete-input/models/autocomplete-input-form-values';
import { AutocompleteInputFormComponent } from '@composite-library/lib/forms/autocomplete-input/autocomplete-input-form.component';
import { SaveWebsiteFormInitialValues } from '@composite-library/lib/forms/save-website-form/models/save-website-form-initial-values';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';

@Component({
  selector: 'lib2-save-website-form',
  templateUrl: './save-website-form.component.html',
  styleUrls: ['./save-website-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveWebsiteFormComponent extends FormController<SaveWebsiteFormValues, SaveWebsiteFormInitialValues> {
  @ViewChild(AutocompleteInputFormComponent) autoCompleteInputFormComponent: AutocompleteInputFormComponent;

  @Input() allTagNames: string[];

  @Output() tagAdd = new EventEmitter<string>();
  @Output() tagDelete = new EventEmitter<string>();
  @Output() contentSelectionMode = new EventEmitter();

  tagNames: string[] = [];

  getFormDefinition(): FormControllerConfig<SaveWebsiteFormValues> {
    this.tagNames = [...this.initialValues.tagNames];

    return {
      title: new FormControl(this.initialValues?.title, FormValidators.note.title),
      newTag: new FormGroup({}),
      content: new FormControl(this.initialValues?.content),
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

  enterContentSelectionMode() {
    this.contentSelectionMode.emit();
  }
}
