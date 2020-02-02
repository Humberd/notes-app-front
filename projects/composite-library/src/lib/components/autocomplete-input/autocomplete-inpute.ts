import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteInputComponent } from './autocomplete-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';


@NgModule({
  declarations: [AutocompleteInputComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    LibFormsModule,
  ],
  exports: [AutocompleteInputComponent],
})
export class AutocompleteInpute {
}
