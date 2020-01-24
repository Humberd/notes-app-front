import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-content-preview',
  templateUrl: './note-content-preview.component.html',
  styleUrls: ['./note-content-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentPreviewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
