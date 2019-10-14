import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../../_services/oauth2.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {

  constructor(
    public oauth2Service: Oauth2Service,
    private matDialogRef: MatDialogRef<any>,
  ) {
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.oauth2Service.googleLogin()
      .then(() => this.matDialogRef.close());
  }
}
