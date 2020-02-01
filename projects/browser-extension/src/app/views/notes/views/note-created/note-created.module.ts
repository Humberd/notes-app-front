import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteCreatedRoutingModule } from './note-created-routing.module';
import { NoteCreatedComponent } from './note-created.component';
import { SaveWebsiteFormModule } from '../../../../forms/save-website-form/save-website-form.module';


@NgModule({
  declarations: [NoteCreatedComponent],
  imports: [
    CommonModule,
    NoteCreatedRoutingModule,
    SaveWebsiteFormModule,
  ],
})
export class NoteCreatedModule {
}
