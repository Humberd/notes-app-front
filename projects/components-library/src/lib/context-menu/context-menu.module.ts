import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from 'components-library/lib/context-menu/components/context-menu/context-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LibTranslateModule } from '../../../../../src/app/shared/translate/translate.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    LibTranslateModule,
    MatMenuModule,
  ],
  declarations: [ContextMenuComponent],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {
}
