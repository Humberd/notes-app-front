import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteModificationDialogComponent } from '@web-app/app/dialogs/modules/note-modification-dialog/note-modification-dialog.component';
import { NoteModificationDialogOutput } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-output';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';
import { ConfirmationDialogComponent } from '@web-app/app/dialogs/modules/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '@web-app/app/dialogs/modules/confirmation-dialog/models/confirmation-dialog-data';
import { NoteView } from '@domain/entity/note/view/note-view';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { WorkspaceModificationDialogComponent } from '@web-app/app/dialogs/modules/workspace-modification-dialog/workspace-modification-dialog.component';
import { WorkspaceModificationDialogData } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-data';
import { WorkspaceModificationDialogOutput } from '@web-app/app/dialogs/modules/workspace-modification-dialog/models/workspace-modification-dialog-output';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';
import { WorkspaceDomainService } from '@domain/entity/workspace/service/workspace-domain.service';
import { TagModificationDialogComponent } from '@web-app/app/dialogs/modules/tag-modification-dialog/tag-modification-dialog.component';
import { TagModificationDialogData } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-data';
import { TagModificationDialogOutput } from '@web-app/app/dialogs/modules/tag-modification-dialog/models/tag-modification-dialog-output';
import { TagView } from '@domain/entity/tag/view/tag-view';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { GroupModificationDialogComponent } from '@web-app/app/dialogs/modules/group-modification-dialog/group-modification-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private matDialog: MatDialog,
    private noteDomainService: NoteDomainService,
    private workspaceDomainService: WorkspaceDomainService,
    private tagDomainService: TagDomainService,
  ) {
  }

  async openCreateNoteDialog() {
    const {NoteModificationDialogModule} = await import('../modules/note-modification-dialog/note-modification-dialog.module');
    return this.matDialog.open<NoteModificationDialogComponent, NoteModificationDialogData, NoteModificationDialogOutput>(
      NoteModificationDialogModule.getDialogClass(),
    );
  }

  async openEditNoteDialog(dialogData: NoteModificationDialogData) {
    const {NoteModificationDialogModule} = await import('../modules/note-modification-dialog/note-modification-dialog.module');
    return this.matDialog.open<NoteModificationDialogComponent, NoteModificationDialogData, NoteModificationDialogOutput>(
      NoteModificationDialogModule.getDialogClass(),
      {
        data: dialogData,
      },
    );
  }

  async openDeleteNoteDialog(note: NoteView) {
    return this.openConfirmationDialog({
      title: 'Delete note',
      content: `You are going to delete note:\n\n${note.title}\n\nAre you sure?`,
      confirm: {
        name: 'Delete',
        color: 'warn',
        action: () => this.noteDomainService.delete(note.id),
      },
    });
  }

  async openCreateWorkspaceDialog() {
    const {WorkspaceModificationDialogModule} =
      await import('../modules/workspace-modification-dialog/workspace-modification-dialog.module');
    return this.matDialog.open<WorkspaceModificationDialogComponent, WorkspaceModificationDialogData, WorkspaceModificationDialogOutput>(
      WorkspaceModificationDialogModule.getDialogClass(),
    );
  }

  async openCreateGroupDialog() {
    const {GroupModificationDialogModule} =
      await import('../modules/group-modification-dialog/group-modification-dialog.module');
    return this.matDialog.open<GroupModificationDialogComponent, any, any>(
      GroupModificationDialogModule.getDialogClass(),
    );
  }

  async openEditWorkspaceDialog(dialogData: WorkspaceModificationDialogData) {
    const {WorkspaceModificationDialogModule} =
      await import('../modules/workspace-modification-dialog/workspace-modification-dialog.module');
    return this.matDialog.open<WorkspaceModificationDialogComponent, WorkspaceModificationDialogData, WorkspaceModificationDialogOutput>(
      WorkspaceModificationDialogModule.getDialogClass(),
      {
        data: dialogData,
      },
    );
  }

  async openDeleteWorkspaceDialog(workspace: WorkspaceView) {
    return this.openConfirmationDialog({
      title: 'Delete Workspace',
      content: `You are going to delete "${workspace.name}" workspace. Notes WILL NOT be deleted.\n\nAre you sure?`,
      confirm: {
        name: 'Delete',
        color: 'warn',
        action: () => this.workspaceDomainService.delete(workspace.id),
      },
    });
  }

  async openCreateTagDialog() {
    const {TagModificationDialogModule} = await import('../modules/tag-modification-dialog/tag-modification-dialog.module');
    return this.matDialog.open<TagModificationDialogComponent, TagModificationDialogData, TagModificationDialogOutput>(
      TagModificationDialogModule.getDialogClass(),
    );
  }

  async openEditTagDialog(dialogData: TagModificationDialogData) {
    const {TagModificationDialogModule} = await import('../modules/tag-modification-dialog/tag-modification-dialog.module');
    return this.matDialog.open<TagModificationDialogComponent, TagModificationDialogData, TagModificationDialogOutput>(
      TagModificationDialogModule.getDialogClass(),
      {
        data: dialogData,
      },
    );
  }

  async openDeleteTagDialog(tag: TagView) {
    return this.openConfirmationDialog({
      title: 'Delete Workspace',
      content: `You are going to delete "${tag.name}" tag. This action will detach "${tag.name}" from all notes.\n\nAre you sure?`,
      confirm: {
        name: 'Delete',
        color: 'warn',
        action: () => this.tagDomainService.delete(tag.id),
      },
    });
  }

  private async openConfirmationDialog(dialogData: ConfirmationDialogData) {
    const {ConfirmationDialogModule} = await import('../modules/confirmation-dialog/confirmation-dialog.module');
    return this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogData>(
      ConfirmationDialogModule.getDialogClass(),
      {
        data: dialogData,
      },
    );
  }
}
