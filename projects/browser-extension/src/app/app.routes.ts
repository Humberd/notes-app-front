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
    loadChildren: () => import('./views/auth/auth.module').then(value => value.AuthModule),
    canActivate: [MustNotBeAuthorizedGuard],
    canActivateChild: [MustNotBeAuthorizedGuard],
  },
  {
    path: 'notes',
    loadChildren: () => import('./views/notes/notes.module').then(m => m.NotesModule),
    canActivate: [MustBeAuthorizedGuard],
    canActivateChild: [MustBeAuthorizedGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
