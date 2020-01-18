import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ResizableModule } from 'angular-resizable-element';
import { GeneralListComponent } from './general-list/general-list.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
} from '@angular/material';
import { GeneralPillComponent } from './general-list/general-pill/general-pill.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteListItemComponent } from './notes-list/note-list-item/note-list-item.component';
import { AppCommonModule } from '../../shared/common/app-common.module';
import { NoteContainerComponent } from './note-container/note-container.component';
import { TagsBarComponent } from './note-container/tags-bar/tags-bar.component';
import { NoteContentComponent } from './note-container/note-content/note-content.component';
import { EditorModule } from '../../shared/editor/editor.module';
import { NoteSearchBarComponent } from './note-search-bar/note-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsBarComponent } from './note-container/actions-bar/actions-bar.component';

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
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
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
    NoteSearchBarComponent,
    ActionsBarComponent,
  ],
})
export class HomeModule {
}
