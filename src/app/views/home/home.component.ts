import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { NoteTypeRouteParam } from './_services/note-type-route-param';
import { NotesRefresherService } from './_services/notes-refresher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    NoteTypeRouteParam,
    NotesRefresherService,
  ],
})
export class HomeComponent implements OnInit {
  readonly resizeAreaWidth = 7;

  generalPanelMinWidth = 100;
  generalPanelWidth = 250;

  notesPanelMinWidth = 100;
  notesPanelWidth = 300;

  constructor(private notesRefresherService: NotesRefresherService) {
  }

  ngOnInit(): void {
    this.notesRefresherService.start();
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
