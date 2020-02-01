import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { LoginFormValues } from './models/login-form-values';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'brx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends FormController<LoginFormValues> {
  getFormDefinition(): FormControllerConfig<LoginFormValues> {
    return {
      login: new FormControl(''),
      password: new FormControl(''),
    };
  }

}
