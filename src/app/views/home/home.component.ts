import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { NoteTypeRouteParam } from './_services/note-type-route-param';
import { NotesRefresherService } from './_services/notes-refresher.service';
import { NotesSearchService } from './_services/notes-search.service';
import { ActivatedRoute } from '@angular/router';
import { TagsRefresherService } from './_services/tags-refresher.service';
import { DataAccessService } from '../../core/data-access-layers/data-access.service';
import { NoteIdRouteParam } from './_services/note-id-route-param';
import { CurrentNoteRefresherService } from './_services/current-note-refresher.service';

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
  ],
})
export class HomeComponent implements OnInit {
  readonly resizeAreaWidth = 7;

  generalPanelMinWidth = 100;
  generalPanelWidth = 250;

  notesPanelMinWidth = 100;
  notesPanelWidth = 300;

  constructor(
    private notesRefresherService: NotesRefresherService,
    private dataAccessService: DataAccessService,
    private notesSearchService: NotesSearchService,
    private activatedRoute: ActivatedRoute,
    private tagsRefresherService: TagsRefresherService,
    private currentNoteRefresherService: CurrentNoteRefresherService,
  ) {
  }

  ngOnInit(): void {
    this.dataAccessService.connect();
    this.notesRefresherService.start();
    this.notesSearchService.start(this.activatedRoute);
    this.tagsRefresherService.start();
    this.currentNoteRefresherService.start();
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
}
