import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveWebsiteFormComponent } from './save-website-form.component';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SaveWebsiteFormComponent],
  imports: [
    CommonModule,
    LibFormsModule,
    ReactiveFormsModule,
  ],
  exports: [SaveWebsiteFormComponent],
})
export class SaveWebsiteFormModule {
}
