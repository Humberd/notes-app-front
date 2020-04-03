import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PasswordCredentialsService } from '../../../domain/src/entity/user/service/password-credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private passwordCredentialService: PasswordCredentialsService) {
  }

  ngOnInit(): void {
    this.passwordCredentialService.login({
      email: 'admin@admin.com',
      password: 'admin123',
    })
      .subscribe(console.log);
  }

}
