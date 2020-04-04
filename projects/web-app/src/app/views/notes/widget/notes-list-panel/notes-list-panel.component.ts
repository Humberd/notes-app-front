import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-notes-list-panel',
  templateUrl: './notes-list-panel.component.html',
  styleUrls: ['./notes-list-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
