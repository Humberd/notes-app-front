import { Routes } from '@angular/router';
import { MustBeAuthorizedGuard } from '@web-app/app/utils/auth/must-be-authorized.guard';
import { MustNotBeAuthorizedGuard } from '@web-app/app/utils/auth/must-not-be-authorized.guard';

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
    canActivateChild: [MustNotBeAuthorizedGuard]
  },
  {
    path: 'my-notes',
    loadChildren: () => import('./views/notes/notes.module').then(value => value.NotesModule),
    canActivate: [MustBeAuthorizedGuard],
    canActivateChild: [MustBeAuthorizedGuard]
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
