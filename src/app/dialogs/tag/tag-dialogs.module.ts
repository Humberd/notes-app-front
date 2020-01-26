import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagDialogsService } from './services/tag-dialogs.service';
import { TagEditDialogComponent } from './components/edit-tag-dialog/tag-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { TagEditFormModule } from '../../forms/tag/tag-edit-form/tag-edit-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonDialogsModule } from '../common/common-dialogs.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule,
    TagEditFormModule,
    ReactiveFormsModule,
    CommonDialogsModule,
  ],
  providers: [
    TagDialogsService,
  ],
  declarations: [TagEditDialogComponent],
  entryComponents: [TagEditDialogComponent],
})
export class TagDialogsModule {
}
