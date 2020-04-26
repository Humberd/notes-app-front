import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceModificationDialogComponent } from './workspace-modification-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [WorkspaceModificationDialogComponent],
})
export class WorkspaceModificationDialogModule {
  static getDialogClass() {
    return WorkspaceModificationDialogComponent;
  }
}
