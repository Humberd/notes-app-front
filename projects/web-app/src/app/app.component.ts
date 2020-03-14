import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@web-app/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', environment);
  }
}
