import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteTagComponent } from './note-tag/note-tag.component';

@NgModule({
  declarations: [NoteTagComponent],
  imports: [
    CommonModule,
  ],
  exports: [NoteTagComponent],
})
export class AppCommonModule {
}
