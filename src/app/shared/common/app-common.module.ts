import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';
import { MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';
import { ContextMenuTriggerForDirective } from './context-menu/context-menu-trigger-for.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NoteTagComponent, ContextMenuTriggerForDirective, ContextMenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    TranslateModule,
  ],
  exports: [NoteTagComponent, ContextMenuTriggerForDirective, ContextMenuComponent],
})
export class AppCommonModule {
}
