import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authorization',
  },
  {
    path: 'authorization',
    loadChildren: () => import('./views/authorization/authorization.module').then(value => value.AuthorizationModule),
  },
  {
    path: 'my-notes',
    loadChildren: () => import('./views/notes/notes.module').then(value => value.NotesModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
