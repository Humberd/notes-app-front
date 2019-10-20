import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Destroy$ } from '@ng-boost/core';
import { NotesRefresherService } from '../_services/notes-refresher.service';

@Component({
  selector: 'app-note-container-empty',
  templateUrl: './note-container-empty.component.html',
  styleUrls: ['./note-container-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContainerEmptyComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  constructor(
    private notesRefresher: NotesRefresherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.notesRefresher.data$
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
