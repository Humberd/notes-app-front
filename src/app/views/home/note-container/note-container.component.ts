import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesService } from '../_services/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContainerComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  note: Note;

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.notes$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(notes => {
        this.note = notes[0];
      });
  }

}
