import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { ContentSelectionBarComponent } from './components/content-selection-bar/content-selection-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: 'content',
    },
  ],
  declarations: [ContentSelectionBarComponent, AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('Content scripts are running from Angular2');
  }

}

