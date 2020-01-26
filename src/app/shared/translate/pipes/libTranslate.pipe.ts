import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Translation } from '../models/translation';

@Pipe({
  name: 'libTranslate',
  pure: false,
})
export class LibTranslatePipe implements PipeTransform {

  constructor(private translatePipe: TranslatePipe) {
  }

  transform(translation: Translation, ...args: any[]): any {
    if (typeof translation === 'string') {
      return this.translatePipe.transform(translation, ...args);
    }

    return this.translatePipe.transform(translation.key, translation.params);
  }

}
