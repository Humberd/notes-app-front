import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesDialogService } from './notes-dialog.service';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '../../../shared/editor/editor.module';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    EditorModule,
    MatButtonModule
  ],
  declarations: [
    CreateNoteComponent
  ],
  entryComponents: [
    CreateNoteComponent
  ],
  providers: [
    NotesDialogService
  ]
})
export class NotesDialogsModule {
}
