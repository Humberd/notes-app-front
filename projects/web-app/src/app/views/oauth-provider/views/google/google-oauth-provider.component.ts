import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-oauth-provider',
  templateUrl: './google-oauth-provider.component.html',
  styleUrls: ['./google-oauth-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleOauthProviderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
