import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesRefresherService } from '../_services/notes-refresher.service';
import { Router } from '@angular/router';
import { NotesSearchService } from '../_services/notes-search.service';
import { FormControl } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppRoutingHelperService } from '../../../shared/common/_services/app-routing-helper.service';
import { NotesService } from '../../../domains/note/services/notes.service';

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
    private notesService: NotesService,
    private notesRefresherService: NotesRefresherService,
    private router: Router,
    private notesSearchService: NotesSearchService,
    private appRoutingHelperService: AppRoutingHelperService,
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
    this.notesService.create()
      .subscribe(note => {
        this.router.navigateByUrl(this.appRoutingHelperService.replaceNoteIdInPath(note.id));
        this.notesRefresherService.refresh();
      });
  }

}
