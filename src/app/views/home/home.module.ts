import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ResizableModule } from 'angular-resizable-element';
import { GeneralListComponent } from './general-list/general-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralPillComponent } from './general-list/general-pill/general-pill.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteListItemComponent } from './notes-list/note-list-item/note-list-item.component';
import { AppCommonModule } from '../../shared/common/app-common.module';
import { NoteContainerComponent } from './note-container/note-container.component';
import { TagsBarComponent } from './note-container/tags-bar/tags-bar.component';
import { NoteContentComponent } from './note-container/note-content/note-content.component';
import { NoteSearchBarComponent } from './note-search-bar/note-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsBarComponent } from './note-container/actions-bar/actions-bar.component';
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
