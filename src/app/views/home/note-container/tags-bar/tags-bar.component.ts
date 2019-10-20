import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note, NoteTag } from '../../../../models/note';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TagsRefresherService } from '../../_services/tags-refresher.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { IndexedDbLayerService } from '../../../../core/notes/storage/indexed-db-layer.service';
import { NotesRefresherService } from '../../_services/notes-refresher.service';

@Component({
  selector: 'app-tags-bar',
  templateUrl: './tags-bar.component.html',
  styleUrls: ['./tags-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsBarComponent implements OnInit {
  @Input() note: Note;
  @Input() removable: boolean;

  newTagControl = new FormControl();
  availableTags$: Observable<string[]>;

  constructor(
    private tagsRefresherService: TagsRefresherService,
    private indexedDbLayerService: IndexedDbLayerService,
    private notesRefresherService: NotesRefresherService,
  ) {

  }

  ngOnInit(): void {
    this.availableTags$ = this.tagsRefresherService.data$
      .pipe(
        map(tags => tags.map(tag => tag.name)),
        switchMap(allTagNames => this.newTagControl.valueChanges
          .pipe(
            startWith(''),
            map((newTagName: string) => newTagName.toLowerCase()),
            // filter tags that matches what user currently has in the input
            map(newTagNameLc => allTagNames.filter(tagName => tagName.toLowerCase().includes(newTagNameLc))),
            // filter tags that are already selected
            map(matchingTagNames => matchingTagNames.filter(tagName => this.note.tags.every(it => it.name !== tagName))),
          ),
        ),
      );
  }

  createNewTag() {
    this.indexedDbLayerService
      .update(this.note.id, {
        title: this.note.title,
        content: this.note.content,
        tags: [...this.note.tags, {name: this.newTagControl.value}],
      })
      .subscribe(newNote => {
        this.tagsRefresherService.refresh();
        this.notesRefresherService.updateRef(newNote);
        this.newTagControl.reset('');
      });
  }

  removeTag(tag: NoteTag) {
    this.indexedDbLayerService
      .update(this.note.id, {
        title: this.note.title,
        content: this.note.content,
        tags: this.note.tags.filter(it => it.name !== tag.name),
      })
      .subscribe(newNote => {
        this.tagsRefresherService.refresh();
        this.notesRefresherService.updateRef(newNote);
      });
  }

}
