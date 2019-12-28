import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note, NoteTag } from '../../../../models/note';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TagsRefresherService } from '../../_services/tags-refresher.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { CurrentNoteRefresherService } from '../../_services/current-note-refresher.service';
import { DataAccessService } from '../../../../core/data-access-layers/data-access.service';

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
    private dataAccessService: DataAccessService,
    private notesRefresherService: NotesRefresherService,
    private currentNoteRefresherService: CurrentNoteRefresherService,
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

  trackBy(index: number, item: NoteTag) {
    return item.name;
  }

  createNewTag() {
    const newTagName = this.newTagControl.value;
    if (this.note.tags.some(tag => tag.name === newTagName)) {
      console.log('Tag already exists');
      return;
    }

    this.dataAccessService
      .addTag(this.note.id, newTagName)
      .subscribe(newNote => {
        this.currentNoteRefresherService.refresh();
        this.tagsRefresherService.refresh();
        this.notesRefresherService.updateRef(newNote);
        this.newTagControl.reset('');
      });
  }

  removeTag(tag: NoteTag) {
    this.dataAccessService
      .removeTag(this.note.id, tag.name)
      .subscribe(newNote => {
        this.currentNoteRefresherService.refresh();
        this.tagsRefresherService.refresh();
        this.notesRefresherService.updateRef(newNote);
      });
  }

}
