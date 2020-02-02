import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteNotCreatedRoutingModule } from './note-not-created-routing.module';
import { NoteNotCreatedComponent } from './note-not-created.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [NoteNotCreatedComponent],
  imports: [
    CommonModule,
    NoteNotCreatedRoutingModule,
    MatButtonModule,
  ],
})
export class NoteNotCreatedModule {
}
