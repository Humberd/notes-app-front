import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './components/label/label.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ControlContainerComponent } from './components/control-container/control-container.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [LabelComponent, InputComponent, ControlContainerComponent, AutofocusDirective, ErrorMessageComponent],
  exports: [LabelComponent, InputComponent, ControlContainerComponent, AutofocusDirective, ErrorMessageComponent],
})
export class LibFormsModule {
}
