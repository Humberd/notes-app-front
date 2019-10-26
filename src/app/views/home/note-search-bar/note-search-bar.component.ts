import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesRefresherService } from '../_services/notes-refresher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesSearchService } from '../_services/notes-search.service';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataAccessService } from '../../../core/data-access-layers/data-access.service';

@Component({
  selector: 'app-note-search-bar',
  templateUrl: './note-search-bar.component.html',
  styleUrls: ['./note-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteSearchBarComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();
  searchControl = new FormControl();

  constructor(
    private dataAccessService: DataAccessService,
    private notesRefresherService: NotesRefresherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesSearchService: NotesSearchService,
  ) {
  }

  ngOnInit(): void {
    this.notesSearchService.query$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(serviceQuery => this.searchControl.setValue(serviceQuery));

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(formQuery => this.notesSearchService.updateQuery(formQuery));
  }

  createNewNote() {
    this.dataAccessService
      .add({
        content: '',
        title: '',
        tags: [],
      })
      .subscribe(note => {
        this.router.navigate([note.id], {relativeTo: this.activatedRoute});
        this.notesRefresherService.refresh();
      });
  }

}
