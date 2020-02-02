import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagsRefresherService } from 'composite-library/lib/services/tags-refresher.service';
import { map, tap } from 'rxjs/operators';
import { Note } from 'domains/lib/note/models/note';
import { NoteTag } from 'domains/lib/note/models/note-tag';
import { TagsService } from 'domains/lib/tag/services/tags.service';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { AutocompleteInputFormValues } from 'composite-library/lib/components/autocomplete-input/models/autocomplete-input-form-values';
import { FormGroup } from '@angular/forms';
import { AutocompleteInputComponent } from 'composite-library/lib/components/autocomplete-input/autocomplete-input.component';

interface Foobar {
  form: AutocompleteInputFormValues;
}

@Component({
  selector: 'app-tags-bar',
  templateUrl: './tags-bar.component.html',
  styleUrls: ['./tags-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsBarComponent extends FormRootController<Foobar> implements OnInit {
  @ViewChild(AutocompleteInputComponent) autocompleteInputComponent: AutocompleteInputComponent;

  @Input()
  set note(note: Note) {
    this.note$.next(note);
  }

  get note(): Note {
    return this.note$.value;
  }

  allTagNames$: Observable<string[]>;
  ignoredTagNames$: Observable<string[]>;

  private readonly note$ = new BehaviorSubject<Note>(null);

  constructor(
    private tagsRefresherService: TagsRefresherService,
    private tagsService: TagsService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.allTagNames$ = this.tagsRefresherService.data$
      .pipe(
        tap(console.log),
        map(tags => tags.map(tag => tag.name)),
      );

    this.ignoredTagNames$ = this.note$
      .pipe(
        map(note => note.tags.map(tag => tag.name)),
      );
  }

  getFormDefinition(): FormControllerConfig<Foobar> {
    return {
      form: new FormGroup({}),
    };
  }

  protected submitAction(values: Foobar): Observable<any> {
    const newTagName = values.form.value;
    if (this.note.tags.some(tag => tag.name === newTagName)) {
      console.log('Tag already exists');
      return;
    }

    return this.tagsService.create({
      noteId: this.note.id,
      name: newTagName,
    });
  }

  protected onSuccess(success: any): void {
    this.autocompleteInputComponent.resetForm();
  }

  trackBy(index: number, item: NoteTag) {
    return item.name;
  }

  removeTag(tag: NoteTag) {
    this.tagsService.delete({
      noteId: this.note.id,
      tagId: tag.id,
    })
      .subscribe();
  }

}
