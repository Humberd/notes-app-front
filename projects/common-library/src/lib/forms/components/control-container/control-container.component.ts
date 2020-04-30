import { Component, ContentChild, Input } from '@angular/core';
import { InputComponent } from 'common-library/lib/forms/components/input/input.component';
import { hasRequiredField } from '@ng-boost/core';

@Component({
  selector: 'lib-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss'],
})
export class ControlContainerComponent {
  @ContentChild(InputComponent) libInput: InputComponent;
  @Input() label: string;

  isRequired(): boolean {
    const ngControl = this.libInput?.ngControl;

    if (!ngControl) {
      return false;
    }

    // tslint:disable-next-line
    return hasRequiredField(ngControl['form']);
  }

  getErrors(): string[] {
    const ngControl = this.libInput?.ngControl;

    if (!ngControl) {
      return;
    }

    if (ngControl.valid) {
      return;
    }

    if (ngControl.untouched) {
      return;
    }

    const errors = Object.entries(ngControl.errors);

    return errors.map(([key, value]) => `${key}: ${value}`);
  }
}
