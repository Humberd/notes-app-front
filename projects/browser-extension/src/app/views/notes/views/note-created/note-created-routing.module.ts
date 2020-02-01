import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteCreatedComponent } from './note-created.component';

const routes: Routes = [
  {
    path: '',
    component: NoteCreatedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteCreatedRoutingModule {
}
