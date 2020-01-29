import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibTranslatePipe } from './pipes/libTranslate.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [LibTranslatePipe],
  exports: [LibTranslatePipe],
})
export class LibTranslateModule {
}
