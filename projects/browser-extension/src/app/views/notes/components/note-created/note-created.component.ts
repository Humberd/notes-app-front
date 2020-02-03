import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TagsRefresherService } from 'composite-library/lib/services/tags-refresher.service';
import { Note } from 'domains/lib/note/models/note';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { SaveWebsiteFormValues } from 'composite-library/lib/forms/save-website-form/models/save-website-form-values';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { SaveWebsiteFormInitialValues } from 'composite-library/lib/forms/save-website-form/models/save-website-form-initial-values';
import { map } from 'rxjs/operators';
import { TagsService } from 'domains/lib/tag/services/tags.service';

interface NoteCreatedFormValues {
  form: SaveWebsiteFormValues;
}

@Component({
  selector: 'brx-note-created',
  templateUrl: './note-created.component.html',
  styleUrls: ['./note-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [TagsRefresherService],
})
export class NoteCreatedComponent extends FormRootController<NoteCreatedFormValues> implements OnInit {
  @Input() note: Note;
  formInitialValues: SaveWebsiteFormInitialValues;

  allTagNames$: Observable<string[]>;

  constructor(
    private tagsRefresherService: TagsRefresherService,
    private tagsService: TagsService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.tagsRefresherService.start();

    this.allTagNames$ = this.tagsRefresherService.data$
      .pipe(
        map(tags => tags.map(tag => tag.name)),
      );

    this.formInitialValues = {
      title: this.note.title,
      tagNames: this.note.tags.map(it => it.name),
    };
  }

  getFormDefinition(): FormControllerConfig<NoteCreatedFormValues> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: NoteCreatedFormValues): Observable<any> {
    console.log('submitting top level form');
    return of();
  }

  handleTagAdd(tagName: string) {
    this.tagsService.create({
      noteId: this.note.id,
      name: tagName,
    })
      .subscribe();
  }

  handleTagDelete(tagName: string) {
    this.tagsService.delete({
      noteId: this.note.id,
      tagId: this.tagsRefresherService.data.find(it => it.name === tagName).id,
    })
      .subscribe();
  }

}
