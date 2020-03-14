import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Injectable()
export class AuthDialogsService {

  constructor(private dialogService: MatDialog) {
  }

  openLoginDialog() {
    return this.dialogService.open(LoginDialogComponent);
  }
}
