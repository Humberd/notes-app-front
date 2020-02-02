import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteInputFormComponent } from './autocomplete-input-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';


@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    LibFormsModule,
  ],
  declarations: [AutocompleteInputFormComponent],
  exports: [AutocompleteInputFormComponent],
})
export class AutocompleteInputFormModule {
}
