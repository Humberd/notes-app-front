import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-edit-form',
  templateUrl: './tag-edit-form.component.html',
  styleUrls: ['./tag-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagEditFormComponent implements OnInit {
  colorPicker: any;

  constructor() {
  }

  ngOnInit() {
  }

}
