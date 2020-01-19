import { AbstractControlValueAccessor } from 'components-library/lib/forms/base-classes/abstract-control-value-accessor';
import { Input } from '@angular/core';

let formControlCounter = 0;

export abstract class AbstractFormControl<ValueType> extends AbstractControlValueAccessor<ValueType> {
  @Input() label: string;
  @Input() placeholder: string;

  readonly id = `form-control-${++formControlCounter}`;
}
