import { Translation } from 'common-library/lib/translate/models/translation';

export type ValidationResult = {
  [key: string]: {
    message: Translation;
    params?: {
      [key: string]: any
    }
  }
} | null;
