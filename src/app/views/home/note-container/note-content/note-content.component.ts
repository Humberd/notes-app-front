import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../models/note';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotesRefresherService } from '../../_services/notes-refresher.service';
import { DataAccessService } from '../../../../core/data-access-layers/data-access.service';

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
        switchMap(newContent => this.dataAccessService.update(this._note.id, {
            content: newContent,
            title: this.getTitle(newContent),
            tags: this._note.tags,
          }),
        ),
      )
      .subscribe(newNote => {
        this.notesRefresherService.updateRef(newNote);
      });
  }

  private getTitle(content: string): string {
    return content.trimLeft().split('\n')[0].trim();
  }

}
