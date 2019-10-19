import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesService } from '../../../core/notes/notes.service';
import { NoteTypeRouteParam } from '../_services/note-type-route-param';
import { Subject } from 'rxjs';
import { Destroy$ } from '@ng-boost/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  constructor(
    public notesService: NotesService,
    private noteTypeRouteParam: NoteTypeRouteParam,
  ) {
  }

  ngOnInit(): void {
    this.noteTypeRouteParam.value$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(note => {

      });
  }

}
