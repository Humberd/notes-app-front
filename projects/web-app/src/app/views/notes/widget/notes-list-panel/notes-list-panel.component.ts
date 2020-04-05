import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { NoteView } from '@domain/entity/note/view/note-view';

@Component({
  selector: 'app-notes-list-panel',
  templateUrl: './notes-list-panel.component.html',
  styleUrls: ['./notes-list-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListPanelComponent implements OnInit {

  constructor(public notesRefresherService: NotesRefresherService) {
  }

  ngOnInit(): void {
  }

  trackBy(index: number, item: NoteView) {
    return item.id;
  }

}
