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
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditorModule } from '../../shared/editor/editor.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    EditorModule
  ],
  declarations: [
    NotesComponent,
    NotesListComponent,
    NoteEntityComponent,
    NoteTagsComponent,
    TagsListComponent,
    SearchBarComponent
  ]
})
export class NotesModule { }
