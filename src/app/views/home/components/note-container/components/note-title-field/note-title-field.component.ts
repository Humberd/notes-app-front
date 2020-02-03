import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from 'domains/lib/note/models/note';
import { NotesService } from 'domains/lib/note/services/notes.service';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';

@Component({
  selector: 'app-note-title-field',
  templateUrl: './note-title-field.component.html',
  styleUrls: ['./note-title-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteTitleFieldComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  // tslint:disable-next-line:variable-name
  private _note: Note;
  @Input()
  set note(newNote: Note) {
    if (this.note?.id !== newNote.id) {
      this.titleControl.setValue(newNote.title);
    }

    this._note = newNote;
  }

  get note(): Note {
    return this._note;
  }

  titleControl = new FormControl('', FormValidators.note.title);

  constructor(
    private notesService: NotesService,
  ) {
  }

  ngOnInit() {
    this.titleControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(it => it !== this.note.content),
        debounceTime(1000),
        switchMap(newTitle => this.notesService.update(this.note.id, {
          title: newTitle,
          content: this.note.content,
          webPageUrl: this.note.webPageUrl,
        })),
      )
      .subscribe();
  }

}
