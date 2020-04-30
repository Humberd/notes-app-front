import { Validators } from '@angular/forms';
import { colorHexValidator } from './validators/color-hex.validator';

export const FormValidators = {
  note: {
    title: [Validators.required],
    url: [],
    content: [],
    tags: [],
    workspaces: [],
  },
  tag: {
    name: Validators.required,
    backgroundColor: colorHexValidator,
  },
  workspace: {
    name: [Validators.required],
  },
  auth: {
    login: {
      login: [Validators.required],
      password: [Validators.required],
    },
    register: {
      login: [],
      password: [],
    },
  },
};
