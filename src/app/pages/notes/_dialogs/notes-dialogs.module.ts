import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { NotesDialogService } from './notes-dialog.service';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '../../../shared/editor/editor.module';
import { NoteFormComponent } from './note-form/note-form.component';
import { TagsAutocompleteComponent } from './note-form/tags-autocomplete/tags-autocomplete.component';
import { EditNoteDialogComponent } from './edit-note-dialog/edit-note-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    EditorModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  declarations: [
    CreateNoteDialogComponent,
    NoteFormComponent,
    TagsAutocompleteComponent,
    EditNoteDialogComponent
  ],
  entryComponents: [
    CreateNoteDialogComponent,
    EditNoteDialogComponent
  ],
  providers: [
    NotesDialogService
  ]
})
export class NotesDialogsModule {
}
