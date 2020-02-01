import { OptionConfig } from 'common-library/lib/context-menu/models/optionConfig';
import { Injectable } from '@angular/core';
import { NoteTag } from 'domains/lib/note/models/note-tag';
import { Tag } from 'domains/lib/tag/models/tag.model';
import { TagDialogsService } from 'composite-library/lib/dialogs/tag/services/tag-dialogs.service';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmationDialogResult } from 'composite-library/lib/dialogs/common/components/confirmation-dialog/models/confirmation-dialog-result';
import { TagsService } from 'domains/lib/tag/services/tags.service';

@Injectable()
export class TagOptionsController {
  constructor(
    private tagDialogsService: TagDialogsService,
    private tagsService: TagsService,
  ) {
  }

  getOptions(): OptionConfig<NoteTag | Tag>[] {
    return [
      {
        icon: 'edit',
        label: 'common.edit',
        showWhen: tag => true,
        action: tag => this.tagDialogsService.openEditTagDialog({
          ...tag,
        }),
      },
      {
        icon: 'delete_forever',
        iconColor: 'warn',
        label: 'common.delete_permanently',
        dividerAbove: true,
        showWhen: tag => true,
        action: tag => this.tagDialogsService.openDeleteTagPermanentlyDialog(tag)
          .afterClosed()
          .pipe(
            filter(result => result === ConfirmationDialogResult.CONFIRMED),
            switchMap(() => this.tagsService.deletePermanently(tag.id)),
          )
          .subscribe(),
      },
    ];
  }
}
