import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input[libInput], textarea[libInput]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {

  constructor(@Optional() public ngControl?: NgControl) {
  }

}
