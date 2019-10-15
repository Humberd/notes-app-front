import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralListComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
