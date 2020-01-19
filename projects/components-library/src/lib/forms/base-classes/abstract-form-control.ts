import { Input } from '@angular/core';
import { AbstractControlValueAccessor } from '@ng-boost/core';

let formControlCounter = 0;

export abstract class AbstractFormControl<ValueType> extends AbstractControlValueAccessor<ValueType> {
  @Input() label: string;
  @Input() placeholder: string;

  readonly id = `form-control-${++formControlCounter}`;
}
