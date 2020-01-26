import { TranslationSchema } from '@src/app/shared/translate/models/translation-schema';
import { TranslationKey } from '@src/app/shared/translate/models/translation-key';

export type Translation = TranslationSchema | TranslationKey;
