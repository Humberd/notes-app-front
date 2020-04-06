import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteModificationDialogFormValues } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-midification-dialog-form-values';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';
import { NoteModificationStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-modification-strategy';
import { NewNoteStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/new-note-strategy';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { EditNoteStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/edit-note-strategy';
import { NoteView } from '@domain/entity/note/view/note-view';

@Component({
  templateUrl: './note-modification-dialog.component.html',
  styleUrls: ['./note-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteModificationDialogComponent extends FormRootController<NoteModificationDialogFormValues> {
  readonly strategy: NoteModificationStrategy;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: NoteModificationDialogData,
    private noteDomainService: NoteDomainService,
    private matDialogRef: MatDialogRef<NoteModificationDialogComponent>,
  ) {
    super();

    if (this.dialogData?.editedNote) {
      this.strategy = new EditNoteStrategy(this.noteDomainService);
    } else {
      this.strategy = new NewNoteStrategy(this.noteDomainService);
    }

  }

  getFormDefinition(): FormControllerConfig<NoteModificationDialogFormValues> {
    return this.strategy.generateFormDefinition(this.dialogData);
  }

  protected submitAction(values: NoteModificationDialogFormValues): Observable<any> {
    return this.strategy.handleSubmit(values);
  }

  protected onSuccess(success: NoteView): void {
    this.matDialogRef.close(success);
  }
}
