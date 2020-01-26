import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { BoostMatContextMenuModule } from '@ng-boost/material';
import { LibTranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [NoteTagComponent, ContextMenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    BoostMatContextMenuModule,
    LibTranslateModule,
  ],
  exports: [NoteTagComponent, ContextMenuComponent],
})
export class AppCommonModule {
}
