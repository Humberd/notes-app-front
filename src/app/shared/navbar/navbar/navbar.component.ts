import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { AuthDialogsService } from '../../../modules/auth/_dialogs/auth-dialogs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authDialogsService: AuthDialogsService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
  }

}
