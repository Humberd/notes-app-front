import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagDialogsService } from './services/tag-dialogs.service';
import { EditTagDialogComponent } from './components/edit-tag-dialog/edit-tag-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { TagEditFormModule } from '../../forms/tag/tag-edit-form/tag-edit-form.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule,
    TagEditFormModule,
  ],
  providers: [
    TagDialogsService,
  ],
  declarations: [EditTagDialogComponent],
  entryComponents: [EditTagDialogComponent],
})
export class TagDialogsModule {
}
