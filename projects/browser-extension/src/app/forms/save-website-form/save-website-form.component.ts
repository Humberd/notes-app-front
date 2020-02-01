import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { SaveWebsiteFormValues } from './models/save-website-form-values';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'brx-save-website-form',
  templateUrl: './save-website-form.component.html',
  styleUrls: ['./save-website-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveWebsiteFormComponent extends FormController<SaveWebsiteFormValues> {

  getFormDefinition(): FormControllerConfig<SaveWebsiteFormValues> {
    return {
      title: new FormControl(),
      tags: new FormControl(),
    };
  }

}
