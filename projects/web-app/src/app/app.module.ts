import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/app.routes';
import { environment } from '@web-app/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { JwtRequestInterceptor } from '@composite-library/lib/auth/jwt-request.interceptor';
import { defaultAuthorizedRoute, defaultUnauthorizedRoute } from '@composite-library/lib/auth/default-routes';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected',
    }),
    MatDialogModule,
    MonacoEditorModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '',
    },
    {
      provide: 'BASE_URL',
      useValue: environment.fullServerApi,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: JwtRequestInterceptor,
    },
    {
      provide: defaultAuthorizedRoute,
      useValue: '/my-notes',
    },
    {
      provide: defaultUnauthorizedRoute,
      useValue: '/authorization',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
