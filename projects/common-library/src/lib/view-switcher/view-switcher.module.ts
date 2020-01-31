import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { LibTranslateModule } from '../translate/translate.module';
import { ButtonsModule } from 'common-library/lib/buttons/buttons.module';
import { ViewSwitcherControlsComponent } from 'common-library/lib/view-switcher/components/view-switcher-controls/view-switcher-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    MatTooltipModule,
    MatIconModule,
    LibTranslateModule,
  ],
  declarations: [ViewSwitcherControlsComponent, ViewSwitcherComponent],
  exports: [ViewSwitcherControlsComponent, ViewSwitcherComponent],
})
export class ViewSwitcherModule {
}
