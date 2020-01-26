import { TranslationKey } from '@src/app/shared/translate/models/translation-key';

export interface TranslationSchema {
  key: TranslationKey;
  params: object;
}
