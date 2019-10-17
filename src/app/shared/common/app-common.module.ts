import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [NoteTagComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [NoteTagComponent],
})
export class AppCommonModule {
}
