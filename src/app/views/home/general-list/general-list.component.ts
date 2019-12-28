import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NoteType, NoteTypeRouteParam } from '../_services/note-type-route-param';
import { filter, takeUntil } from 'rxjs/operators';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { TagsRefresherService } from '../_services/tags-refresher.service';
import { AppRoutingHelperService } from '../../../shared/common/_services/app-routing-helper.service';

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
    public tagsRefresherService: TagsRefresherService,
    private appRoutingHelperService: AppRoutingHelperService,
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

  replaceNoteTypeInPathWith(path: NoteType): string {
    return this.appRoutingHelperService.replaceNoteTypeInPath(path, this.noteTypeRouteParam.value);
  }

}
