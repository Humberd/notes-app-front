import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NoteTypeRouteParam } from '../_services/note-type-route-param';
import { filter, takeUntil } from 'rxjs/operators';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralListComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  constructor(
    private router: Router,
    public noteTypeRouteParam: NoteTypeRouteParam,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(it => it instanceof NavigationEnd),
      )
      .subscribe(() => this.cdr.markForCheck());
  }

  replaceNoteTypeInPathWith(path: string): string {
    const urlSegments = this.router.url.split('/');
    const noteTypeIndex = urlSegments.findIndex(value => value === this.noteTypeRouteParam.value);
    if (noteTypeIndex < 0) {
      return `../${path}`;
    }

    urlSegments[noteTypeIndex] = path;
    return urlSegments.join('/').split('?')[0];
  }

}
