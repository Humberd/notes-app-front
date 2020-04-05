import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteDetailsComponent } from './note-details.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/notes/views/note-details/note-details.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NoteDetailsComponent],
})
export class NoteDetailsModule {
}
