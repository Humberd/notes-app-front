import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesService } from '../../../core/notes/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Destroy$ } from '@ng-boost/core';

@Component({
  selector: 'app-note-container-empty',
  templateUrl: './note-container-empty.component.html',
  styleUrls: ['./note-container-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContainerEmptyComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  constructor(
    private notesService: NotesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.notesService.notes$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(notes => {
        if (notes.length === 0) {
          console.log('Cannot select the first note, because there are no notes');
          return;
        }

        this.router.navigate([notes[0].id], {relativeTo: this.activatedRoute});
      });
  }

}
