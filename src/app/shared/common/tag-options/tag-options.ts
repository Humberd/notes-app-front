import { OptionConfig } from '../optionConfig';
import { Injectable } from '@angular/core';
import { NoteTag } from '../../../domains/note/models/note-tag';
import { Tag } from '../../../domains/tag/models/tag.model';
import { TagDialogsService } from '../../../dialogs/tag-dialogs/services/tag-dialogs.service';
import { filter } from 'rxjs/operators';
import { ConfirmationDialogResult } from '../../../dialogs/common-dialogs/components/confirmation-dialog/models/confirmation-dialog-result';

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
        action: tag => this.tagDialogsService.openEditTagDialog({
          ...tag,
        }),
      },
      {
        icon: 'delete_forever',
        iconColor: 'warn',
        labelTK: 'common.delete_permanently',
        dividerAbove: true,
        showWhen: tag => true,
        action: tag => this.tagDialogsService.openDeleteTagPermanentlyDialog(tag)
          .afterClosed()
          .pipe(
            filter(result => result === ConfirmationDialogResult.CONFIRMED),
          )
          .subscribe(() => console.log('CONFIRMED')),
      },
    ];
  }
}
