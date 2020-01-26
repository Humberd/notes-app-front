import { AbstractControl } from '@angular/forms';
import { ValidationResult } from '../models/validation-result';

export function colorHexValidator(control: AbstractControl): ValidationResult {
  if (!control.value) {
    return null;
  }

  const colorHexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (colorHexRegex.test(control.value)) {
    return null;
  }

  return {
    colorHex: {
      message: 'validators.color_hex',
    },
  };
}
