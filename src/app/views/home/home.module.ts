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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResizableModule,
    TranslateModule,
    MatIconModule,
    AppCommonModule,
  ],
  declarations: [
    HomeComponent,
    GeneralListComponent,
    GeneralPillComponent,
    NotesListComponent,
    NoteListItemComponent,
    NoteContainerComponent,
    TagsBarComponent,
  ],
})
export class HomeModule {
}
