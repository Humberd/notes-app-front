import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/notes/notes.routes';
import { NotesTopPanelComponent } from './widget/notes-top-panel/notes-top-panel.component';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TagsLeftPanelComponent } from './widget/tags-left-panel/tags-left-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { NotesListPanelComponent } from './widget/notes-list-panel/notes-list-panel.component';
import { LinkModule } from 'common-library/lib/link/link.module';
import { MarkdownPreviewModule } from 'common-library/lib/markdown-preview/markdown-preview.module';
import { TagsModule } from 'common-library/lib/tags/tags.module';
import { NoteTagModule } from '@composite-library/lib/components/note-tag/note-tag.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LibFormsModule,
    ButtonsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    LinkModule,
    MarkdownPreviewModule,
    TagsModule,
    NoteTagModule,
    ReactiveFormsModule,
  ],
  declarations: [NotesComponent, NotesTopPanelComponent, TagsLeftPanelComponent, NotesListPanelComponent],
})
export class NotesModule {
}
