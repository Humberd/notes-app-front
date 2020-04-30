import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'brx-credentials-register',
  templateUrl: './credentials-register.component.html',
  styleUrls: ['./credentials-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsRegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
