import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../../../domains/note/models/note';
import { NoteViewSwitcherService } from '../../../../services/note-view-switcher.service';

@Component({
  selector: 'app-note-container-view-switcher',
  templateUrl: './note-container-view-switcher.component.html',
  styleUrls: ['./note-container-view-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContainerViewSwitcherComponent implements OnInit {
  @Input() note: Note;

  constructor(public noteViewSwitcherService: NoteViewSwitcherService) {
  }

  ngOnInit() {
  }

}
