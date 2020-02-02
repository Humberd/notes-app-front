import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { LoginFormValues } from './models/login-form-values';
import { FormControl } from '@angular/forms';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';

@Component({
  selector: 'lib2-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends FormController<LoginFormValues> {
  getFormDefinition(): FormControllerConfig<LoginFormValues> {
    return {
      login: new FormControl('', FormValidators.auth.login.login),
      password: new FormControl('', FormValidators.auth.login.password),
    };
  }

}
