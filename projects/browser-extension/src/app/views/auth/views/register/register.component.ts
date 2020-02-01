import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'brx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
