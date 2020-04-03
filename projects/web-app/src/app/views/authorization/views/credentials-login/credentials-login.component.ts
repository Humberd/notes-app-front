import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';

interface CredentialsLoginFormValues {
  email: string,
  password: string
}

@Component({
  selector: 'app-credentials-login',
  templateUrl: './credentials-login.component.html',
  styleUrls: ['./credentials-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsLoginComponent extends FormRootController<CredentialsLoginFormValues> {
  rootForm: FormGroup;

  constructor(private authorizationHandlerService: AuthorizationHandlerService) {
    super();
  }

  getFormDefinition(): FormControllerConfig<CredentialsLoginFormValues> {
    return {
      email: new FormControl('', FormValidators.auth.login.login),
      password: new FormControl('', FormValidators.auth.login.password),
    };
  }

  protected submitAction(values: CredentialsLoginFormValues): Observable<any> {
    return this.authorizationHandlerService.login({
      email: values.email,
      password: values.password
    });
  }
}
