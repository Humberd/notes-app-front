import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Translation } from '../models/translation';

@Pipe({
  name: 'libTranslate',
  pure: false,
})
export class LibTranslatePipe extends TranslatePipe implements PipeTransform {

  // @ts-ignore
  transform(translation: Translation, ...args: any[]): any {
    if (typeof translation === 'string') {
      return super.transform(translation, ...args);
    }

    return super.transform(translation.key, translation.params);
  }

}
