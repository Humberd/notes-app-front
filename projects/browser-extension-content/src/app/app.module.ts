import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: 'content',
    },
  ],
})
export class AppModule {
  constructor() {
    console.log('Content scripts are running from Angular2');
  }

  ngDoBootstrap() {
    console.log('Im bootstrapped');
  }
}

