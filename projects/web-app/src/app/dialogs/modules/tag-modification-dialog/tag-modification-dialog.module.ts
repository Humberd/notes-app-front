import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModificationDialogComponent } from './tag-modification-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TagModificationDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibFormsModule,
    ColorPickerModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class TagModificationDialogModule {
  static getDialogClass() {
    return TagModificationDialogComponent;
  }
}
