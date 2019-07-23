import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { RouterModule } from '@angular/router';
import { routes } from './notes.routes';
import { HttpClientModule } from '@angular/common/http';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteEntityComponent } from './notes-list/note-entity/note-entity.component';
import { MatCardModule } from '@angular/material/card';
import { NoteTagsComponent } from './notes-list/note-entity/note-tags/note-tags.component';
import { MatChipsModule } from '@angular/material/chips';
import { TagsListComponent } from './tags-list/tags-list.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatCardModule,
    MatChipsModule,
    MatListModule
  ],
  declarations: [
    NotesComponent,
    NotesListComponent,
    NoteEntityComponent,
    NoteTagsComponent,
    TagsListComponent
  ]
})
export class NotesModule { }
