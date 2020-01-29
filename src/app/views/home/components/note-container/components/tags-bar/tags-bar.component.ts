import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagsRefresherService } from '../../../../services/tags-refresher.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Note } from 'domains/lib/note/models/note';
import { NoteTag } from 'domains/lib/note/models/note-tag';
import { TagsService } from 'domains/lib/tag/services/tags.service';

@Component({
  selector: 'app-tags-bar',
  templateUrl: './tags-bar.component.html',
  styleUrls: ['./tags-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsBarComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _note: Note;
  @Input()
  set note(note: Note) {
    const previousNote = this._note;
    this._note = note;

    const noteChanged = previousNote && note && previousNote.id !== note.id;
    if (noteChanged) {
      this.noteChanged$.next();
    }
  }

  get note(): Note {
    return this._note;
  }

  @Input() removable: boolean;

  private readonly noteChanged$ = new BehaviorSubject<void>(null);

  newTagControl = new FormControl('');
  availableTags$: Observable<string[]>;

  constructor(
    private tagsRefresherService: TagsRefresherService,
    private tagsService: TagsService,
  ) {

  }

  ngOnInit(): void {
    this.availableTags$ = this.noteChanged$
      .pipe(
        switchMap(() => this.getAllTagsNames$()),
        switchMap(allTagNames => this.getInputLcValue$()
          .pipe(
            // filter tags that matches what user currently has in the input
            map(newTagNameLc => allTagNames.filter(tagName => tagName.toLowerCase().includes(newTagNameLc))),
            // filter tags that are already selected
            map(matchingTagNames => matchingTagNames.filter(tagName => this.note.tags.every(it => it.name !== tagName))),
          ),
        ),
      );
  }

  trackBy(index: number, item: NoteTag) {
    return item.name;
  }

  createNewTag() {
    const newTagName = this.newTagControl.value;
    if (this.note.tags.some(tag => tag.name === newTagName)) {
      console.log('Tag already exists');
      return;
    }

    this.tagsService.create({
      noteId: this.note.id,
      name: newTagName,
    })
      .subscribe(() => {
        this.newTagControl.reset('');
      });
  }

  removeTag(tag: NoteTag) {
    this.tagsService.delete({
      noteId: this.note.id,
      tagId: tag.id,
    })
      .subscribe();
  }

  private getInputLcValue$(): Observable<string> {
    return this.newTagControl.valueChanges
      .pipe(
        startWith(this.newTagControl.value as string),
        map((newTagName: string) => newTagName.toLowerCase()),
      );
  }

  private getAllTagsNames$(): Observable<string[]> {
    return this.tagsRefresherService.data$
      .pipe(
        map(tags => tags.map(tag => tag.name)),
      );
  }
}
