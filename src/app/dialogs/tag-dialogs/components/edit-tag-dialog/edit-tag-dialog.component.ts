import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-tag-dialog',
  templateUrl: './edit-tag-dialog.component.html',
  styleUrls: ['./edit-tag-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTagDialogComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
