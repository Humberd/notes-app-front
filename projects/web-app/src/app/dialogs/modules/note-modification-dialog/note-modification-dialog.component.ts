import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteView } from '@domain/entity/note/view/note-view';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';

export interface NoteModificationDialogData {
  editedNote?: NoteView;
}

interface NoteModificationDialogFormValues {
  title: string;
  url: string;
  content: string;
}

@Component({
  templateUrl: './note-modification-dialog.component.html',
  styleUrls: ['./note-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteModificationDialogComponent extends FormRootController<NoteModificationDialogFormValues> {

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: NoteModificationDialogData) {
    super();
  }

  getFormDefinition(): FormControllerConfig<NoteModificationDialogFormValues> {
    return {
      title: new FormControl(this.dialogData?.editedNote?.title ?? '', FormValidators.note.title),
      url: new FormControl(this.dialogData?.editedNote?.url ?? '',  FormValidators.note.url),
      content: new FormControl(this.dialogData?.editedNote?.content ?? '',  FormValidators.note.content),
    };
  }

  protected submitAction(values: NoteModificationDialogFormValues): Observable<any> {
    return undefined;
  }

}
