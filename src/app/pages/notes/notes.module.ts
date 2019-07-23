import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { RouterModule } from '@angular/router';
import { routes } from './notes.routes';
import { HttpClientModule } from '@angular/common/http';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteEntityComponent } from './notes-list/note-entity/note-entity.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [
    NotesComponent,
    NotesListComponent,
    NoteEntityComponent
  ]
})
export class NotesModule { }
