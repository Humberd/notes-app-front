import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../models/note';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListItemComponent implements OnInit {
  @Input() note: Note;

  constructor() {
  }

  ngOnInit() {
  }

}
