import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { DataAccessService } from '../../../../core/data-access-layers/data-access.service';
import { Note } from '../../../../domains/note/models/note.model';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();
  noteContentControl = new FormControl();

  // tslint:disable-next-line:variable-name
  private _note: Note;
  @Input()
  set note(note: Note) {
    this._note = note;
    this.noteContentControl.setValue(note.content);
  }

  constructor(
    private dataAccessService: DataAccessService,
    private notesRefresherService: NotesRefresherService,
  ) {
  }

  ngOnInit(): void {
    this.noteContentControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(it => it !== this._note.content),
        // debounceTime(1000),
        switchMap(newContent => this.dataAccessService.updateContent(this._note.id, this.getTitle(newContent), newContent)),
      )
      .subscribe(newNote => {
        this.notesRefresherService.updateRef(newNote);
      });
  }

  private getTitle(content: string): string {
    return content.trimLeft().split('\n')[0].trim();
  }

}
