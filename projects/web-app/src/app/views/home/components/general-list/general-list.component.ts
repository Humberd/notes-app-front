import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NoteTypeRouteParam } from '../../services/note-type-route-param';
import { filter, takeUntil } from 'rxjs/operators';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { AppRoutingHelperService } from '../../../../shared/common/_services/app-routing-helper.service';
import { TagOptionsController } from 'composite-library/lib/services/tag-options';
import { NotesStatsRefresherService } from '../../services/notes-stats-refresher.service';
import { PanelExpansionStatus } from '../../models/panel-expansion-status';
import { NoteType } from 'domains/lib/note/models/note-types';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TagOptionsController],
})
export class GeneralListComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();

  @Input() panelExpansionStatus: PanelExpansionStatus;
  @Output() panelHide = new EventEmitter();
  @Output() panelShow = new EventEmitter();

  PanelExpansionStatus = PanelExpansionStatus;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private appRoutingHelperService: AppRoutingHelperService,
    public noteTypeRouteParam: NoteTypeRouteParam,
    public notesStatsRefresherService: NotesStatsRefresherService,
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

  togglePanel(): void {
    switch (this.panelExpansionStatus) {
      case PanelExpansionStatus.VISIBLE:
        this.panelHide.next();
        break;
      case PanelExpansionStatus.HIDDEN:
        this.panelShow.next();
        break;
      default:
        throw Error('unhandled toggle panel state');
    }
  }

}
