import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from 'components-library/lib/context-menu/components/context-menu/context-menu.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ContextMenuComponent],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {
}
