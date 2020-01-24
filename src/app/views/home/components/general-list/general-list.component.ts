import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NoteType, NoteTypeRouteParam } from '../../services/note-type-route-param';
import { filter, takeUntil } from 'rxjs/operators';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { TagsRefresherService } from '../../services/tags-refresher.service';
import { AppRoutingHelperService } from '../../../../shared/common/_services/app-routing-helper.service';
import { TagOptionsController } from '../../../../shared/common/tag-options/tag-options';
import { OptionConfig } from '../../../../shared/common/optionConfig';
import { Tag } from '../../../../domains/tag/models/tag.model';
import { NotesStatsRefresherService } from '../../services/notes-stats-refresher.service';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TagOptionsController],
})
export class GeneralListComponent implements OnInit {
  @Destroy$() private readonly destroy$ = new Subject();
  tagOptions: OptionConfig<Tag>[];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private appRoutingHelperService: AppRoutingHelperService,
    private tagOptionsController: TagOptionsController,
    public tagsRefresherService: TagsRefresherService,
    public noteTypeRouteParam: NoteTypeRouteParam,
    public notesStatsRefresherService: NotesStatsRefresherService,
  ) {
    this.tagOptions = this.tagOptionsController.getOptions();
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
