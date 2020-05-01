import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JwtRequestInterceptor } from '@composite-library/lib/auth/jwt-request.interceptor';
import { environment } from '../environments/environment';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(routes, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected',
    }),
    MonacoEditorModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/browser-extension/',
    },
    {
      provide: 'BASE_URL',
      useValue: environment.fullServerApi,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: JwtRequestInterceptor,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
