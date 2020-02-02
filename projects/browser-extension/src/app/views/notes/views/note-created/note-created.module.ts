import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteCreatedRoutingModule } from './note-created-routing.module';
import { NoteCreatedComponent } from './note-created.component';
import { SaveWebsiteFormModule } from 'composite-library/lib/forms/save-website-form/save-website-form.module';


@NgModule({
  imports: [
    CommonModule,
    NoteCreatedRoutingModule,
    SaveWebsiteFormModule,
  ],
  declarations: [NoteCreatedComponent],
})
export class NoteCreatedModule {
}
