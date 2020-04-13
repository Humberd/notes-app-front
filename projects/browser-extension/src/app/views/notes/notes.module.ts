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
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { AutocompleteInputFormModule } from '@composite-library/lib/forms/autocomplete-input/autocomplete-input-form.module';
import { NoteTagModule } from '@composite-library/lib/components/note-tag/note-tag.module';
import { EditorModule } from 'common-library/lib/editor/editor.module';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    SaveWebsiteFormModule,
    MatButtonModule,
    CommonDialogsModule,
    ReactiveFormsModule,
    MatIconModule,
    LibFormsModule,
    AutocompleteInputFormModule,
    NoteTagModule,
    EditorModule,
    ButtonsModule,
    MatMenuModule,
  ],
  declarations: [NotesComponent, NoteCreatedComponent, NoteNotCreatedComponent, SaveWebsiteFormOptionsComponent],
})
export class NotesModule {
}
