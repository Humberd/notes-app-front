import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { FormControl } from '@angular/forms';
import { TagEditFormValues } from './models/tag-edit-form-values';
import { FormValidators } from '../../../form-validators/form.validators';
import { TagEditInitialValues } from './models/tag-edit-initial-values';

@Component({
  selector: 'lib2-tag-edit-form',
  templateUrl: './tag-edit-form.component.html',
  styleUrls: ['./tag-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagEditFormComponent extends FormController<TagEditFormValues, TagEditInitialValues> {
  getFormDefinition(): FormControllerConfig<TagEditFormValues> {
    if (!this.initialValues) {
      return {
        name: new FormControl('', FormValidators.tag.name),
        colorHex: new FormControl('', FormValidators.tag.colorHex),
      };
    }

    return {
      name: new FormControl(this.initialValues.name, FormValidators.tag.name),
      colorHex: new FormControl(this.initialValues.colorHex, FormValidators.tag.colorHex),
    };
  }

}
