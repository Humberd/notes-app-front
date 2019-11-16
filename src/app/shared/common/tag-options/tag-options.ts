import { OptionConfig } from '../optionConfig';
import { NoteTag } from '../../../models/note';

export class TagOptions {
  constructor() {

  }

  getOptions(): OptionConfig<NoteTag>[] {
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
