import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { NoteTypeRouteParam } from './services/note-type-route-param';
import { NotesRefresherService } from './services/notes-refresher.service';
import { NotesSearchService } from './services/notes-search.service';
import { ActivatedRoute } from '@angular/router';
import { TagsRefresherService } from './services/tags-refresher.service';
import { NoteIdRouteParam } from './services/note-id-route-param';
import { CurrentNoteRefresherService } from './services/current-note-refresher.service';
import { NotesStatsRefresherService } from './services/notes-stats-refresher.service';
import { GeneralPanelExpansionService } from './services/general-panel-expansion.service';
import { PanelExpansionStatus } from './models/panel-expansion-status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    NoteTypeRouteParam,
    NoteIdRouteParam,
    NotesRefresherService,
    NotesSearchService,
    TagsRefresherService,
    CurrentNoteRefresherService,
    NotesStatsRefresherService,
    GeneralPanelExpansionService,
  ],
})
export class HomeComponent implements OnInit {
  readonly resizeAreaWidth = 7;

  generalPanelWidthWhenHidden = 50;

  generalPanelMinWidth = 100;
  generalPanelWidth = 250;

  notesPanelMinWidth = 100;
  notesPanelWidth = 300;

  PanelExpansionStatus = PanelExpansionStatus;

  constructor(
    private notesRefresherService: NotesRefresherService,
    private notesSearchService: NotesSearchService,
    private activatedRoute: ActivatedRoute,
    private tagsRefresherService: TagsRefresherService,
    private currentNoteRefresherService: CurrentNoteRefresherService,
    private notesStatsRefresherService: NotesStatsRefresherService,
    public generalPanelExpansionService: GeneralPanelExpansionService,
  ) {
  }

  ngOnInit(): void {
    this.notesRefresherService.start();
    this.notesSearchService.start(this.activatedRoute);
    this.tagsRefresherService.start();
    this.currentNoteRefresherService.start();
    this.notesStatsRefresherService.start();
  }

  generalPanelValidator = (resizeEvent: ResizeEvent) => {
    return resizeEvent.rectangle.width >= this.generalPanelMinWidth;
  };

  generalPanelResizeEnd(event: ResizeEvent) {
    this.generalPanelWidth = event.rectangle.width;
  }


  notesPanelValidator = (resizeEvent: ResizeEvent) => {
    return resizeEvent.rectangle.width >= this.notesPanelMinWidth;
  };

  notesPanelResizeEnd(event: ResizeEvent) {
    this.notesPanelWidth = event.rectangle.width;
  }

  getMainContentWidth(): string {
    let generalPanelWidth = this.generalPanelWidth;
    if (this.generalPanelExpansionService.status === PanelExpansionStatus.HIDDEN) {
      generalPanelWidth = this.generalPanelWidthWhenHidden;
    }

    return `calc(100% - ${generalPanelWidth}px - ${this.notesPanelWidth}px)`;
  }
}
