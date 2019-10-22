import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';
import { MatIconModule } from '@angular/material';
import { ContextMenuTriggerForDirective } from './context-menu-trigger-for.directive';

@NgModule({
  declarations: [NoteTagComponent, ContextMenuTriggerForDirective],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [NoteTagComponent, ContextMenuTriggerForDirective],
})
export class AppCommonModule {
}
