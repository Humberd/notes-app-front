import { OptionConfig } from '../optionConfig';
import { Injectable } from '@angular/core';
import { NoteTag } from '../../../domains/note/models/note-tag.model';
import { Tag } from '../../../domains/tag/models/tag.model';

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
