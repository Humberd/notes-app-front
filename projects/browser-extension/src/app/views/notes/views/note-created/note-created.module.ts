import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteCreatedRoutingModule } from './note-created-routing.module';
import { NoteCreatedComponent } from './note-created.component';


@NgModule({
  declarations: [NoteCreatedComponent],
  imports: [
    CommonModule,
    NoteCreatedRoutingModule,
  ],
})
export class NoteCreatedModule {
}
