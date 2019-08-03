import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/notes/notes.module').then(
      value => value.NotesModule)
  },
  {
    path: 'oauth2',
    loadChildren: () => import('./modules/auth/auth.module').then(
      value => value.AuthModule)
  }
];
