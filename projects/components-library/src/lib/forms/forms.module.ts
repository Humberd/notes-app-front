import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './components/input/input-control.component';
import { LabelComponent } from './components/label/label.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [InputControlComponent, LabelComponent],
  exports: [InputControlComponent, LabelComponent],
})
export class LibFormsModule {
}
