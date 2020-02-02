import { Validators } from '@angular/forms';
import { colorHexValidator } from './validators/color-hex.validator';

export const FormValidators = {
  note: {
    title: [],
    content: [],
  },
  tag: {
    name: Validators.required,
    colorHex: colorHexValidator,
  },
  auth: {
    login: {
      login: [],
      password: [],
    },
    register: {
      login: [],
      password: [],
    },
  },
};
