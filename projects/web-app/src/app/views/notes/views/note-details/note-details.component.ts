import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NoteIdParamService } from '@web-app/app/views/notes/views/note-details/service/note-id-param.service';
import { CurrentNoteRefresherService } from '@web-app/app/views/notes/views/note-details/service/current-note-refresher.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    NoteIdParamService,
    CurrentNoteRefresherService,
  ],
})
export class NoteDetailsComponent implements OnInit, OnDestroy {

  constructor(public currentNoteRefresherService: CurrentNoteRefresherService) {
  }

  ngOnInit(): void {
    this.currentNoteRefresherService.start();
  }

  ngOnDestroy(): void {
    this.currentNoteRefresherService.stop();
  }

}
