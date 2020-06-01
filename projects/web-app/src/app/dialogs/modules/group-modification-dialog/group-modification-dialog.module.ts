import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupModificationDialogComponent } from './group-modification-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibFormsModule,
    MatButtonModule,
  ],
  declarations: [GroupModificationDialogComponent],
})
export class GroupModificationDialogModule {
  static getDialogClass() {
    return GroupModificationDialogComponent;
  }
}
