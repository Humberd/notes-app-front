import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteNotCreatedComponent } from './note-not-created.component';

const routes: Routes = [
  {
    path: '',
    component: NoteNotCreatedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteNotCreatedRoutingModule {
}
