import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PasswordCredentialsDomainService } from '../../../domain/src/entity/user/service/password-credentials-domain.service';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private authorizationHandlerService: AuthorizationHandlerService) {
  }

  ngOnInit(): void {
    this.authorizationHandlerService.login({
      email: 'admin@admin.com',
      password: 'admin123',
    })
      // .subscribe({
      //   error: console.error
      // });
  }

}
