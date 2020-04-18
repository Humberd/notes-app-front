import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../browser-extension/src/environments/environment';
import { JwtRequestInterceptor } from '@composite-library/lib/auth/jwt-request.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/background/',
    },
    {
      provide: 'BASE_URL',
      useValue: environment.fullServerApi,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
