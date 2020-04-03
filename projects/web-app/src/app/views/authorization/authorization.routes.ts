import { Routes } from '@angular/router';
import { AuthorizationComponent } from '@web-app/app/views/authorization/authorization.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      {
        path: '',
        redirectTo: 'credentials/login',
      },
      {
        path: 'credentials/login',
        loadChildren: () => import('./views/credentials-login/credentials-login.module').then(value => value.CredentialsLoginModule),
      },
      {
        path: 'credentials/register',
        loadChildren: () => import('./views/credentials-register/credentials-register.module')
          .then(value => value.CredentialsRegisterModule),
      },
    ],
  },
];
