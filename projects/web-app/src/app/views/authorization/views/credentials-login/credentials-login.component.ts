import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-credentials-login',
  templateUrl: './credentials-login.component.html',
  styleUrls: ['./credentials-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
