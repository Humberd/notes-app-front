import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'credentials/login',
      },
      {
        path: 'credentials/login',
        loadChildren: () => import('./views/credentials-login/credentials-login.module').then(value => value.CredentialsLoginModule),
      },
    ],
  },
];
