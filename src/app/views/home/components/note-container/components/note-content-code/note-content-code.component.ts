import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Note } from 'domains/lib/note/models/note';
import { NotesService } from 'domains/lib/note/services/notes.service';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;

@Component({
  selector: 'app-note-content-code',
  templateUrl: './note-content-code.component.html',
  styleUrls: ['./note-content-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentCodeComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();
  readonly editorOptions: IEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'markdown',
    wordWrap: 'on',
    automaticLayout: true,
  };
  noteContentControl = new FormControl('', FormValidators.note.content);

  // tslint:disable-next-line:variable-name
  private _note: Note;
  @Input()
  set note(newNote: Note) {
    if (this.note?.id !== newNote.id) {
      this.noteContentControl.setValue(newNote.content);
    }

    this._note = newNote;
  }

  get note(): Note {
    return this._note;
  }

  constructor(
    private notesService: NotesService,
  ) {
  }

  ngOnInit(): void {
    this.noteContentControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(it => it !== this.note.content),
        debounceTime(1000),
        switchMap(newContent => this.notesService.update(this.note.id, {
          title: this.note.title,
          content: newContent,
        })),
      )
      .subscribe();
  }

}
