import { ThemePalette } from '@angular/material/core';
import { Translation } from '../../translate/models/translation';

export interface OptionConfig<T> {
  icon: string;
  iconColor?: ThemePalette;
  label: Translation;
  showWhen: (note: T) => boolean;
  action: (note: T) => any;
  dividerAbove?: boolean;
}
