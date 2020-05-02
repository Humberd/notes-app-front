import { Routes } from '@angular/router';
import { MustNotBeAuthorizedGuard } from '@composite-library/lib/auth/must-not-be-authorized.guard';
import { MustBeAuthorizedGuard } from '@composite-library/lib/auth/must-be-authorized.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authorization',
  },
  {
    path: 'authorization',
    loadChildren: () => import('./views/authorization/authorization.module').then(value => value.AuthorizationModule),
    canActivate: [MustNotBeAuthorizedGuard],
    canActivateChild: [MustNotBeAuthorizedGuard],
  },
  {
    path: 'my-notes',
    loadChildren: () => import('./views/notes/notes.module').then(value => value.NotesModule),
    canActivate: [MustBeAuthorizedGuard],
    canActivateChild: [MustBeAuthorizedGuard],
  },
  {
    path: 'extension/login',
    loadChildren: () => import('./views/extension-login/extension-login.module').then(value => value.ExtensionLoginModule),
  },
  {
    path: 'oauth/providers/login',
    loadChildren: () => import('./views/oauth-provider/oauth-provider.module').then(value => value.OauthProviderModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
