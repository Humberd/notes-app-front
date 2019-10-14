import { Component, Inject } from '@angular/core';
import { NoteDto } from '../../_models/notes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotesHttpService } from '../../_services/notes-http.service';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';

export type DeleteNoteDialogData = NoteDto;

@Component({
  selector: 'app-delete-note-dialog',
  templateUrl: './delete-note-dialog.component.html',
  styleUrls: ['./delete-note-dialog.component.scss'],
})
export class DeleteNoteDialogComponent extends FormRootController<any> {
  constructor(
    private matDialogRef: MatDialogRef<any>,
    private notesHttpService: NotesHttpService,
    @Inject(MAT_DIALOG_DATA) public dialogData?: DeleteNoteDialogData,
  ) {
    super();
  }

  getFormDefinition(): FormControllerConfig<any> {
    return undefined;
  }

  protected submitAction(values: any): Observable<any> {
    return this.notesHttpService.delete(this.dialogData.id);
  }


  protected onSuccess(success: any): void {
    this.matDialogRef.close();
  }
}
