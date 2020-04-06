import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteModificationDialogComponent } from '@web-app/app/dialogs/modules/note-modification-dialog/note-modification-dialog.component';
import { TagsModule } from 'common-library/lib/tags/tags.module';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'common-library/lib/editor/editor.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    TagsModule,
    LibFormsModule,
    ReactiveFormsModule,
    EditorModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [NoteModificationDialogComponent],
})
export class NoteModificationDialogModule {

  static getDialogClass() {
    return NoteModificationDialogComponent;
  }
}
