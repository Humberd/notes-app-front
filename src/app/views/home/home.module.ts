import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ResizableModule } from 'angular-resizable-element';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralPillComponent } from './components/general-list/components/general-pill/general-pill.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteListItemComponent } from './components/notes-list/note-list-item/note-list-item.component';
import { NoteContainerComponent } from './components/note-container/note-container.component';
import { TagsBarComponent } from './components/note-container/components/tags-bar/tags-bar.component';
import { NoteContentCodeComponent } from './components/note-container/components/note-content-code/note-content-code.component';
import { NoteSearchBarComponent } from './components/note-search-bar/note-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsBarComponent } from './components/note-container/components/actions-bar/actions-bar.component';
import { TagDialogsModule } from '../../dialogs/tag/tag-dialogs.module';
import { EditorModule } from 'common-library/lib/editor/editor.module';
import { BoostMatContextMenuModule } from '@ng-boost/material';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { NoteContainerActionsComponent } from './components/note-container/components/note-container-actions/note-container-actions.component';
import { ViewSwitcherModule } from 'common-library/lib/view-switcher/view-switcher.module';
import { NoteContentPreviewComponent } from './components/note-container/components/note-content-preview/note-content-preview.component';
import { NoteContentComponent } from './components/note-container/components/note-content/note-content.component';
import { MarkdownPreviewModule } from 'common-library/lib/markdown-preview/markdown-preview.module';
import { NoteTitleFieldComponent } from './components/note-container/components/note-title-field/note-title-field.component';
import { LibTranslateModule } from 'common-library/lib/translate/translate.module';
import { ContextMenuModule } from 'common-library/lib/context-menu/context-menu.module';
import { NoteTagModule } from '../../shared/note-tag/note-tag.module';
import { GeneralTagsListComponent } from './components/general-list/components/general-tags-list/general-tags-list.component';
import { GeneralTagHoverOptionsComponent } from './components/general-list/components/general-tag-hover-options/general-tag-hover-options.component';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResizableModule,
    MatIconModule,
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
    ButtonsModule,
    ViewSwitcherModule,
    MarkdownPreviewModule,
    LibTranslateModule,
    ContextMenuModule,
    NoteTagModule,
    LibFormsModule,
  ],
  declarations: [
    HomeComponent,
    GeneralListComponent,
    GeneralPillComponent,
    NotesListComponent,
    NoteListItemComponent,
    NoteContainerComponent,
    TagsBarComponent,
    NoteContentCodeComponent,
    NoteSearchBarComponent,
    ActionsBarComponent,
    NoteContainerActionsComponent,
    NoteContentPreviewComponent,
    NoteContentComponent,
    NoteTitleFieldComponent,
    GeneralTagsListComponent,
    GeneralTagHoverOptionsComponent,
  ],
})
export class HomeModule {
}
