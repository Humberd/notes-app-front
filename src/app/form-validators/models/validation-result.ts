import { Translation } from '../../../../projects/common-library/src/lib/translate/models/translation';

export type ValidationResult = {
  [key: string]: {
    message: Translation;
    params?: {
      [key: string]: any
    }
  }
} | null;
