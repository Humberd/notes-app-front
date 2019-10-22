import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NoteIdRouteParam } from '../_services/note-id-route-param';
import { CurrentNoteRefresherService } from '../_services/current-note-refresher.service';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    NoteIdRouteParam,
    CurrentNoteRefresherService,
  ],
})
export class NoteContainerComponent implements OnInit {
  constructor(
    public currentNoteRefresher: CurrentNoteRefresherService,
  ) {
  }

  ngOnInit() {
    this.currentNoteRefresher.start();
  }

}
