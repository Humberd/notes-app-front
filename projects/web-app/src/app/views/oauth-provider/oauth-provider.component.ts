import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationHandlerService } from '@composite-library/lib/auth/authorization-handler.service';

@Component({
  selector: 'app-oauth-provider',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OauthProviderComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationHandlerService: AuthorizationHandlerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const jwt = this.activatedRoute.snapshot.queryParams.jwt;

    if (!jwt) {
      this.router.navigateByUrl('/');
      return;
    }

    this.authorizationHandlerService.loginViaToken(jwt)
      .subscribe(() => {
        this.router.navigateByUrl('/')
      });
  }

}
