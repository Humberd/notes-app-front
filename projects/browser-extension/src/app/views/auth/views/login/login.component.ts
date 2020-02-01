import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormValues } from '../../../../forms/login-form/models/login-form-values';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthorizationService } from 'domains/lib/authorization/services/authorization.service';
import { Router } from '@angular/router';

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

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {
    super();
  }

  getFormDefinition(): FormControllerConfig<RootLoginFormValues> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: RootLoginFormValues): Observable<any> {
    return this.authorizationService.login({
      login: values.form.login,
      password: values.form.password,
    });
  }


  protected onSuccess(success: any): void {
    this.router.navigateByUrl('/home');
  }
}
