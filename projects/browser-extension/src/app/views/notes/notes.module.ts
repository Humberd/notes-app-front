import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { AutocompleteInputFormModule } from '@composite-library/lib/forms/autocomplete-input/autocomplete-input-form.module';
import { NoteTagModule } from '@composite-library/lib/components/note-tag/note-tag.module';
import { EditorModule } from 'common-library/lib/editor/editor.module';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { notesRoutes } from './notes.routes';
import { TagsAutocompleterComponent } from './widget/tags-autocompleter/tags-autocompleter.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    LibFormsModule,
    AutocompleteInputFormModule,
    NoteTagModule,
    EditorModule,
    ButtonsModule,
    MatMenuModule,
    MatSelectModule,
    RouterModule.forChild(notesRoutes),
    MatProgressSpinnerModule,
  ],
  declarations: [NotesComponent, TagsAutocompleterComponent],
})
export class NotesModule {
}
