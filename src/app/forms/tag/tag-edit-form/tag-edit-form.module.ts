import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagEditFormComponent } from './tag-edit-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { LibTranslateModule } from 'common-library/lib/translate/translate.module';
import { TagsModule } from 'common-library/lib/tags/tags.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ColorPickerModule,
    LibFormsModule,
    LibTranslateModule,
    TagsModule,
    ReactiveFormsModule,
  ],
  declarations: [TagEditFormComponent],
  exports: [TagEditFormComponent],
})
export class TagEditFormModule {
}
