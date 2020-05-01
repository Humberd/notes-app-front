import { Routes } from '@angular/router';
import { MustBeAuthorizedExtensionGuard } from './guards/must-be-authorized-extension.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: 'notes',
    loadChildren: () => import('./views/notes/notes.module').then(m => m.NotesModule),
    canLoad: [MustBeAuthorizedExtensionGuard]
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
