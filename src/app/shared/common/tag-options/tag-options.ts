import { OptionConfig } from '../optionConfig';
import { Tag } from '../../../models/note';

export class TagOptions {
  constructor() {

  }

  getOptions(): OptionConfig<Tag>[] {
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
