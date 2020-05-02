import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oauth-provider',
  templateUrl: './oauth-provider.component.html',
  styleUrls: ['./oauth-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OauthProviderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
