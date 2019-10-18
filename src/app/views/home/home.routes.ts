import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NoteContainerComponent } from './note-container/note-container.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':noteId',
        component: NoteContainerComponent,
      },
    ],
  },
];
