import { OptionConfig } from '../optionConfig';
import { Injectable } from '@angular/core';
import { NoteTag } from '../../../domains/note/models/note-tag';
import { Tag } from '../../../domains/tag/models/tag.model';
import { TagDialogsService } from '../../../dialogs/tag-dialogs/services/tag-dialogs.service';

@Injectable()
export class TagOptionsController {

  constructor(private tagDialogsService: TagDialogsService) {
  }

  getOptions(): OptionConfig<NoteTag | Tag>[] {
    return [
      {
        icon: 'edit',
        labelTK: 'common.edit',
        showWhen: tag => true,
        action: tag => this.tagDialogsService.openEditTagDialog(),
      },
    ];
  }
}
