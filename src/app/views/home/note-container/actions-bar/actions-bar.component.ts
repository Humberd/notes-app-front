import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../models/note';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsBarComponent implements OnInit {
  @Input() note: Note;

  constructor() {
  }

  ngOnInit() {
  }

}
