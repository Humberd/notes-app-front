import { Injectable } from '@angular/core';
import { AbstractAuthService } from './abstract-auth.service';
import { AuthDialogsService } from './_dialogs/auth-dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractAuthService {

  constructor(private authDialogsService: AuthDialogsService) {
    super();
  }

  login() {
    this.authDialogsService.openLoginDialog();
  }

  logout() {

  }

}
