import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-credentials-register',
  templateUrl: './credentials-register.component.html',
  styleUrls: ['./credentials-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
