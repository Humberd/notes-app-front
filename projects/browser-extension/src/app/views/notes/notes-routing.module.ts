import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: '',
        redirectTo: 'not-created',
      },
      {
        path: 'not-created',
        loadChildren: () => import('./views/note-not-created/note-not-created.module').then(m => m.NoteNotCreatedModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {
}
