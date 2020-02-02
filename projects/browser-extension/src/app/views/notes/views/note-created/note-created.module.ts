import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteCreatedRoutingModule } from './note-created-routing.module';
import { NoteCreatedComponent } from './note-created.component';
import { SaveWebsiteFormModule } from 'composite-library/lib/forms/save-website-form/save-website-form.module';
import { TagDialogsModule } from 'composite-library/lib/dialogs/tag/tag-dialogs.module';


@NgModule({
  imports: [
    CommonModule,
    NoteCreatedRoutingModule,
    SaveWebsiteFormModule,
    TagDialogsModule,
  ],
  declarations: [NoteCreatedComponent],
})
export class NoteCreatedModule {
}
