import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/notes/notes.routes';
import { NotesTopPanelComponent } from './widget/notes-top-panel/notes-top-panel.component';
import { LibFormsModule } from 'common-library/lib/forms/forms.module';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LibFormsModule,
    ButtonsModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [NotesComponent, NotesTopPanelComponent],
})
export class NotesModule {
}
