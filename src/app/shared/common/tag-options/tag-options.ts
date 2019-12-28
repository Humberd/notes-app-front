import { OptionConfig } from '../optionConfig';
import { NoteTag, Tag } from '../../../models/note';
import { Injectable } from '@angular/core';

@Injectable()
export class TagOptionsController {

  getOptions(): OptionConfig<NoteTag | Tag>[] {
    return [
      {
        icon: 'edit',
        labelTK: 'tags.edit_name',
        showWhen: tag => true,
        action: tag => console.log('click'),
      },
      {
        icon: 'color_lens',
        labelTK: 'tags.edit_color',
        showWhen: tag => true,
        action: tag => console.log('click'),
      },
    ];
  }
}
