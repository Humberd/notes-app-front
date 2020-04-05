import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';
import { HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';
import { mapTo, tap } from 'rxjs/operators';

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
  errorMessage: string;

  constructor(
    private authorizationHandlerService: AuthorizationHandlerService,
    private router: Router,
  ) {
    super();
  }

  getFormDefinition(): FormControllerConfig<CredentialsLoginFormValues> {
    return {
      email: new FormControl('admin@admin.com', FormValidators.auth.login.login),
      password: new FormControl('admin123', FormValidators.auth.login.password),
    };
  }

  protected submitAction(values: CredentialsLoginFormValues): Observable<any> {
    this.errorMessage = undefined;
    return this.authorizationHandlerService.login({
      email: values.email,
      password: values.password,
    })
  }

  protected onSuccess(success: any): void {
    this.router.navigate(['/my-notes'])
  }

  protected onError(err: HttpResponseBase): void {
    switch (err.status) {
      case 401:
        this.errorMessage = 'Unauthorized';
        break;
      default:
        this.errorMessage = 'Unknown error';
    }
  }
}
