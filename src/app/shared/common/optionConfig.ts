import { ThemePalette } from '@angular/material';

export interface OptionConfig<T> {
  icon: string;
  iconColor?: ThemePalette;
  labelTK: string;
  showWhen: (note: T) => boolean;
  action: (note: T) => any;
  dividerAbove?: boolean;
}
