import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NoteCreatedComponent } from './components/note-created/note-created.component';
import { NoteNotCreatedComponent } from './components/note-not-created/note-not-created.component';
import { SaveWebsiteFormModule } from '@composite-library/lib/forms/save-website-form/save-website-form.module';
import { MatButtonModule } from '@angular/material/button';
import { CommonDialogsModule } from '@composite-library/lib/dialogs/common/common-dialogs.module';
import { TagDialogsModule } from '@composite-library/lib/dialogs/tag/tag-dialogs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SaveWebsiteFormOptionsComponent } from './components/save-website-form-options/save-website-form-options.component';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    SaveWebsiteFormModule,
    MatButtonModule,
    CommonDialogsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  declarations: [NotesComponent, NoteCreatedComponent, NoteNotCreatedComponent, SaveWebsiteFormOptionsComponent],
})
export class NotesModule {
}
