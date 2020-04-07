import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteDetailsComponent } from './note-details.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/notes/views/note-details/note-details.routes';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatIconModule } from '@angular/material/icon';
import { LinkModule } from 'common-library/lib/link/link.module';
import { NoteTagModule } from '@composite-library/lib/components/note-tag/note-tag.module';
import { MarkdownPreviewModule } from 'common-library/lib/markdown-preview/markdown-preview.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonsModule,
    MatIconModule,
    LinkModule,
    NoteTagModule,
    MarkdownPreviewModule,
  ],
  declarations: [NoteDetailsComponent],
})
export class NoteDetailsModule {
}
