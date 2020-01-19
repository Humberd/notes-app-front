import { Validators } from '@angular/forms';
import { colorHexValidator } from './validators/color-hex.validator';

export const FormValidators = {
  tag: {
    name: Validators.required,
    colorHex: colorHexValidator,
  },
};
