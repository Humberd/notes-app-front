import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { NoteTypeRouteParam } from './_services/note-type-route-param';
import { NotesRefresherService } from './_services/notes-refresher.service';
import { IndexedDbLayerService } from '../../core/notes/storage/indexed-db-layer.service';
import { NotesSearchService } from './_services/notes-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    NoteTypeRouteParam,
    NotesRefresherService,
    NotesSearchService,
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
    private indexedDbLayerService: IndexedDbLayerService,
    private notesSearchService: NotesSearchService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.indexedDbLayerService.connect();
    this.notesRefresherService.start();
    this.notesSearchService.start(this.activatedRoute);
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
