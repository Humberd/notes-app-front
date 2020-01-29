import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogsService } from './services/common-dialogs.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LibTranslateModule } from 'components-library/lib/translate/translate.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LibTranslateModule,
  ],
  providers: [CommonDialogsService],
  declarations: [ConfirmationDialogComponent],
})
export class CommonDialogsModule {
}
