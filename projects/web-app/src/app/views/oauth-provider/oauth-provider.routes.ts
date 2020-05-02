import { Routes } from '@angular/router';
import { OauthProviderComponent } from '@web-app/app/views/oauth-provider/oauth-provider.component';

export const routes: Routes = [
  {
    path: '',
    component: OauthProviderComponent,
    children: [
      {
        path: 'google',
        loadChildren: () => import('./views/google/google-oauth-provider.module').then(value => value.GoogleOauthProviderModule),
      },
    ],
  },
];
