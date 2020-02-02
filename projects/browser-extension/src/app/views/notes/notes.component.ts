import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'brx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
