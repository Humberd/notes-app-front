import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';
import { MatIconModule } from '@angular/material';
import { ContextMenuTriggerFor } from './context-menu-trigger-for.directive';

@NgModule({
  declarations: [NoteTagComponent, ContextMenuTriggerFor],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [NoteTagComponent, ContextMenuTriggerFor],
})
export class AppCommonModule {
}
