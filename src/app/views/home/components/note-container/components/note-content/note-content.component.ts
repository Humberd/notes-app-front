import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../../../domains/note/models/note';
import { ViewSwitcherService } from 'components-library/lib/view-switcher/services/view-switcher.service';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentComponent implements OnInit {
  @Input() note: Note;

  constructor(public viewSwitcherService: ViewSwitcherService) {
  }

  ngOnInit() {
  }

}
