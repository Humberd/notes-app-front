import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material';
import { AuthDialogsService } from './auth-dialogs.service';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [
    AuthDialogsService
  ],
  declarations: [LoginDialogComponent],
  entryComponents: [LoginDialogComponent]
})
export class AuthDialogsModule { }
