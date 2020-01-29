import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './components/note-tag/note-tag.component';
import { TagsModule } from 'components-library/lib/tags/tags.module';
import { BoostMatContextMenuModule } from '@ng-boost/material';
import { ContextMenuModule } from 'components-library/lib/context-menu/context-menu.module';

@NgModule({
  imports: [
    CommonModule,
    TagsModule,
    BoostMatContextMenuModule,
    ContextMenuModule,
  ],
  declarations: [NoteTagComponent],
  exports: [NoteTagComponent],
})
export class NoteTagModule {
}
