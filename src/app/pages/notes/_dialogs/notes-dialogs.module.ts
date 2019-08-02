import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesDialogService } from './notes-dialog.service';
import { MatDialogModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
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
