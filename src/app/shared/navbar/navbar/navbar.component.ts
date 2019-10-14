import { Component, OnInit } from '@angular/core';
import { AuthDialogsService } from '../../../core/auth/_dialogs/auth-dialogs.service';
import { AuthService } from '../../../core/auth/_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    public authDialogsService: AuthDialogsService,
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

}
