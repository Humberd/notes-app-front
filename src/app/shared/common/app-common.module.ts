import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BoostMatContextMenuModule } from '@ng-boost/material';
import { LibTranslateModule } from 'components-library/lib/translate/translate.module';
import { ContextMenuModule } from 'components-library/lib/context-menu/context-menu.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    BoostMatContextMenuModule,
    LibTranslateModule,
    ContextMenuModule,
  ],
  declarations: [NoteTagComponent],
  exports: [NoteTagComponent],
})
export class AppCommonModule {
}
