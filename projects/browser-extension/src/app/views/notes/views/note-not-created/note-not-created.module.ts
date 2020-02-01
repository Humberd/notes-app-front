import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteNotCreatedRoutingModule } from './note-not-created-routing.module';
import { NoteNotCreatedComponent } from './note-not-created.component';


@NgModule({
  declarations: [NoteNotCreatedComponent],
  imports: [
    CommonModule,
    NoteNotCreatedRoutingModule,
  ],
})
export class NoteNotCreatedModule {
}
