import { Translation } from '../../shared/translate/models/translation';

export type ValidationResult = {
  [key: string]: {
    message: Translation;
    params?: {
      [key: string]: any
    }
  }
} | null;
