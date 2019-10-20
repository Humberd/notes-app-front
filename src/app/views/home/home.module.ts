import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ResizableModule } from 'angular-resizable-element';
import { GeneralListComponent } from './general-list/general-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';
import { GeneralPillComponent } from './general-list/general-pill/general-pill.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteListItemComponent } from './notes-list/note-list-item/note-list-item.component';
import { AppCommonModule } from '../../shared/common/app-common.module';
import { NoteContainerComponent } from './note-container/note-container.component';
import { TagsBarComponent } from './note-container/tags-bar/tags-bar.component';
import { NoteContentComponent } from './note-container/note-content/note-content.component';
import { EditorModule } from '../../shared/editor/editor.module';
import { NoteContainerEmptyComponent } from './note-container-empty/note-container-empty.component';
import { NoteSearchBarComponent } from './note-search-bar/note-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResizableModule,
    TranslateModule,
    MatIconModule,
    AppCommonModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent,
    GeneralListComponent,
    GeneralPillComponent,
    NotesListComponent,
    NoteListItemComponent,
    NoteContainerComponent,
    TagsBarComponent,
    NoteContentComponent,
    NoteContainerEmptyComponent,
    NoteSearchBarComponent,
  ],
})
export class HomeModule {
}
