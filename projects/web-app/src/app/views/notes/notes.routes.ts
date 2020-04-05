import { Routes } from '@angular/router';
import { NotesComponent } from '@web-app/app/views/notes/notes.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: ':id',
        loadChildren: () => import('./views/note-details/note-details.module').then(value => value.NoteDetailsModule),
      },
    ],
  },
];
