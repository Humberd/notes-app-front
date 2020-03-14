import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { BoostMatIconModule } from '@ng-boost/material';
import { AuthModule } from './core/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ColorPickerModule } from 'ngx-color-picker';
import { BoostTitleModule } from '@ng-boost/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AuthModule,
    BrowserAnimationsModule,
    BoostMatIconModule.forRoot({
      iconPaths: [''],
    }),
    MonacoEditorModule.forRoot(),
    ColorPickerModule,
    BoostTitleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
