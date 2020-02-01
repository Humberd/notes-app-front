import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormValues } from '../../../../forms/login-form/models/login-form-values';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

interface RootLoginFormValues {
  form: LoginFormValues;
}

@Component({
  selector: 'brx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends FormRootController<RootLoginFormValues> {
  getFormDefinition(): FormControllerConfig<RootLoginFormValues> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: RootLoginFormValues): Observable<any> {
    return undefined;
  }


}
