import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagEditFormComponent } from './tag-edit-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { LibFormsModule } from 'components-library/lib/forms/forms.module';
import { LibTranslateModule } from 'components-library/lib/translate/translate.module';
import { TagsModule } from 'components-library/lib/tags/tags.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ColorPickerModule,
    LibFormsModule,
    LibTranslateModule,
    TagsModule,
  ],
  declarations: [TagEditFormComponent],
  exports: [TagEditFormComponent],
})
export class TagEditFormModule {
}
