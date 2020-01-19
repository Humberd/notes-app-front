import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagEditFormComponent } from './tag-edit-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppCommonModule } from '../../../shared/common/app-common.module';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { LibFormsModule } from 'components-library/lib/forms/forms.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    AppCommonModule,
    MatInputModule,
    ColorPickerModule,
    LibFormsModule,
    TranslateModule,
  ],
  declarations: [TagEditFormComponent],
  exports: [TagEditFormComponent],
})
export class TagEditFormModule {
}
