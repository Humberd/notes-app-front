import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteModificationDialogFormValues } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-midification-dialog-form-values';
import { NoteModificationDialogData } from '@web-app/app/dialogs/modules/note-modification-dialog/models/note-modification-dialog-data';
import { NoteModificationStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-modification-strategy';
import { NoteCreateStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-create-strategy';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { NoteEditStrategy } from '@web-app/app/dialogs/modules/note-modification-dialog/strategies/note-edit-strategy';
import { NoteView } from '@domain/entity/note/view/note-view';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-modification-dialog',
  templateUrl: './note-modification-dialog.component.html',
  styleUrls: ['./note-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteModificationDialogComponent extends FormRootController<NoteModificationDialogFormValues> implements OnInit {
  autocompleteInnerControl = new FormControl('');
  autocompleteFormGroup = new FormGroup({autocompleteInnerControl: this.autocompleteInnerControl});

  readonly strategy: NoteModificationStrategy;
  allTags: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: NoteModificationDialogData,
    private noteDomainService: NoteDomainService,
    private matDialogRef: MatDialogRef<NoteModificationDialogComponent>,
    private tagDomainService: TagDomainService,
  ) {
    super();

    if (this.dialogData?.editedNote) {
      this.strategy = new NoteEditStrategy(this.noteDomainService);
    } else {
      this.strategy = new NoteCreateStrategy(this.noteDomainService);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tagDomainService.readList()
      .subscribe(tags => {
        this.allTags = tags.data.map(tag => tag.name);
      });
  }

  getFormDefinition(): FormControllerConfig<NoteModificationDialogFormValues> {
    return this.strategy.generateFormDefinition(this.dialogData);
  }

  protected submitAction(values: NoteModificationDialogFormValues): Observable<any> {
    return this.strategy.handleSubmit(this.dialogData, values);
  }

  protected onSuccess(success: NoteView): void {
    this.matDialogRef.close(success);
  }

  addTag() {
    const newTagName = this.autocompleteInnerControl.value.trim();
    if (!newTagName) {
      console.warn('Value cannot be blank');

      return;
    }

    this.formDefinition.tags.setValue([
      ...this.formDefinition.tags.value,
      newTagName,
    ]);
    this.autocompleteInnerControl.reset();
  }

  removeTag(tagName: string) {
    this.formDefinition.tags.setValue(
      this.formDefinition.tags.value.filter(it => it.toLowerCase() !== tagName.toLowerCase()),
    );
  }
}
