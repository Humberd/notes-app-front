import { ThemePalette } from '@angular/material/core';
import { Translation } from '../../../../../../src/app/shared/translate/models/translation';

export interface OptionConfig<T> {
  icon: string;
  iconColor?: ThemePalette;
  label: Translation;
  showWhen: (note: T) => boolean;
  action: (note: T) => any;
  dividerAbove?: boolean;
}
