import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Note } from '../../../models/note';
import { NoteIdRouteParam } from '../_services/note-id-route-param';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [NoteIdRouteParam],
})
export class NoteContainerComponent implements OnInit {
  currentNote$: Observable<Note>;

  constructor(
    private indexedDb: IndexedDbLayerService,
    private noteIdRouteParam: NoteIdRouteParam,
  ) {
  }

  ngOnInit() {
    this.currentNote$ = this.noteIdRouteParam.value$
      .pipe(
        switchMap(noteId => this.indexedDb.read(noteId)),
      );
  }

}
