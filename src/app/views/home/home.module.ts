import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ResizableModule } from 'angular-resizable-element';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralPillComponent } from './components/general-list/general-pill/general-pill.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteListItemComponent } from './components/notes-list/note-list-item/note-list-item.component';
import { AppCommonModule } from '../../shared/common/app-common.module';
import { NoteContainerComponent } from './components/note-container/note-container.component';
import { TagsBarComponent } from './components/note-container/tags-bar/tags-bar.component';
import { NoteContentComponent } from './components/note-container/note-content/note-content.component';
import { NoteSearchBarComponent } from './components/note-search-bar/note-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsBarComponent } from './components/note-container/actions-bar/actions-bar.component';
import { TagDialogsModule } from '../../dialogs/tag-dialogs/tag-dialogs.module';
import { EditorModule } from 'components-library/lib/editor/editor.module';
import { BoostMatContextMenuModule } from '@ng-boost/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResizableModule,
    TranslateModule,
    MatIconModule,
    AppCommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    EditorModule,
    TagDialogsModule,
    BoostMatContextMenuModule,
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
