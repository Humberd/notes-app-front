import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceModificationDialogComponent } from './workspace-modification-dialog.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [WorkspaceModificationDialogComponent],
})
export class WorkspaceModificationDialogModule {
  static getDialogClass() {
    return WorkspaceModificationDialogComponent;
  }
}
