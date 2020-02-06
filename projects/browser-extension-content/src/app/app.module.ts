import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { ContentSelectionBarComponent } from './components/content-selection-bar/content-selection-bar.component';
import { createCustomElement } from '@angular/elements';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  declarations: [ContentSelectionBarComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    console.log('Content scripts are running from Angular2');
  }

  ngDoBootstrap() {
    const contentSelectionBarComponent = createCustomElement(ContentSelectionBarComponent, {injector: this.injector});
    customElements.define('app-content-selection-bar', contentSelectionBarComponent);

    const elem = document.createElement('app-content-selection-bar');

    document.body.appendChild(elem);
  }
}

