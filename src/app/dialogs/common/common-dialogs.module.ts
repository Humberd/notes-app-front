import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogsService } from './services/common-dialogs.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
  ],
  providers: [CommonDialogsService],
  declarations: [ConfirmationDialogComponent],
})
export class CommonDialogsModule {
}
