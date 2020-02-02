import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveWebsiteFormComponent } from './save-website-form.component';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteInputFormModule } from 'composite-library/lib/forms/autocomplete-input/autocomplete-input-form.module';
import { NoteTagModule } from 'composite-library/lib/components/note-tag/note-tag.module';


@NgModule({
  declarations: [SaveWebsiteFormComponent],
  imports: [
    CommonModule,
    LibFormsModule,
    ReactiveFormsModule,
    AutocompleteInputFormModule,
    NoteTagModule,
  ],
  exports: [SaveWebsiteFormComponent],
})
export class SaveWebsiteFormModule {
}
