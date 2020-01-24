import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotesRefresherService } from '../../../../services/notes-refresher.service';
import { Note } from '../../../../../../domains/note/models/note';
import { NotesService } from '../../../../../../domains/note/services/notes.service';
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
  noteContentControl = new FormControl();

  // tslint:disable-next-line:variable-name
  private _note: Note;
  @Input()
  set note(note: Note) {
    this._note = note;
    this.noteContentControl.setValue(note.content);
  }

  constructor(
    private notesService: NotesService,
    private notesRefresherService: NotesRefresherService,
  ) {
  }

  ngOnInit(): void {
    this.noteContentControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(it => it !== this._note.content),
        debounceTime(1000),
        switchMap(newContent => this.notesService.update(this._note.id, {
          title: this.getTitle(newContent),
          content: newContent,
        })),
      )
      .subscribe(newNote => {
        this.notesRefresherService.updateRef(newNote);
      });
  }

  private getTitle(content: string): string {
    return content.trimLeft().split('\n')[0].trim();
  }

}
