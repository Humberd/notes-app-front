import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NoteView } from '@domain/entity/note/view/note-view';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';

interface NoteCreatedFormValues {
  title: string,
  content: string,
  tags: string[]
}

@Component({
  selector: 'brx-note-created',
  templateUrl: './note-created.component.html',
  styleUrls: ['./note-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCreatedComponent extends FormRootController<NoteCreatedFormValues> implements OnInit {
  @Input() note: NoteView;
  @Input() tabId: number;

  autocompleteInnerControl = new FormControl('');
  autocompleteFormGroup = new FormGroup({autocompleteInnerControl: this.autocompleteInnerControl});
  allTags: string[];

  constructor(
    private tagDomainService: TagDomainService,
    private noteDomainService: NoteDomainService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tagDomainService.readList()
      .subscribe(tags => {
        this.allTags = tags.data.map(tag => tag.name);
      });
  }

  getFormDefinition(): FormControllerConfig<NoteCreatedFormValues> {
    return {
      title: new FormControl(this.note.title, FormValidators.note.title),
      tags: new FormControl(this.note.tags.map(tag => tag.name), FormValidators.note.tags),
      content: new FormControl(this.note.content, FormValidators.note.content),
    };
  }

  protected submitAction(values: NoteCreatedFormValues): Observable<any> {
    return this.noteDomainService.patch(this.note.id, {
      title: values.title,
      content: values.content,
      tags: values.tags.map(tagName => ({name: tagName})),
    });
  }

  addTag() {
    if (!this.autocompleteInnerControl.value) {
      return;
    }

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
