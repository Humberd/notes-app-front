import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagEditDialogComponent } from '../components/edit-tag-dialog/tag-edit-dialog.component';
import { TagEditDialogData } from '../components/edit-tag-dialog/models/tag-edit-dialog-data';
import { CommonDialogsService } from '../../common/services/common-dialogs.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TagDialogsService {

  constructor(
    private dialog: MatDialog,
    private commonDialogsService: CommonDialogsService,
    private translateService: TranslateService,
  ) {
  }

  openEditTagDialog(data: TagEditDialogData) {
    return this.dialog.open(TagEditDialogComponent, {data});
  }

  openDeleteTagPermanentlyDialog(data: any) {
    return this.commonDialogsService.openConfirmationDialog({
      title: this.translateService.instant('tags.delete_tag_dialog_title'),
      content: this.translateService.instant('tags.delete_tag_dialog_content', {value: data.name}),
      actionButton: this.translateService.instant('common.delete'),
      actionButtonColor: 'warn',
    });
  }
}
