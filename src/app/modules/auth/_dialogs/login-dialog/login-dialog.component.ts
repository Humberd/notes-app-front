import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../../oauth2.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(public oauth2Service: Oauth2Service) {
  }

  ngOnInit() {
  }

}
