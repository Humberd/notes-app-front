import { Routes } from '@angular/router';
import { Oauth2AuthorizedComponent } from './oauth2-authorized/oauth2-authorized.component';

export const routes: Routes = [
  {
    path: 'authorized',
    component: Oauth2AuthorizedComponent
  }
];
