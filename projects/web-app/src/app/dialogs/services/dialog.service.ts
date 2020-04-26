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

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private matDialog: MatDialog,
    private noteDomainService: NoteDomainService,
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

  async openCreateWorkspaceDialog() {
    const {WorkspaceModificationDialogModule} =
      await import('../modules/workspace-modification-dialog/workspace-modification-dialog.module');
    return this.matDialog.open<WorkspaceModificationDialogComponent, WorkspaceModificationDialogData, WorkspaceModificationDialogOutput>(
      WorkspaceModificationDialogModule.getDialogClass(),
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
