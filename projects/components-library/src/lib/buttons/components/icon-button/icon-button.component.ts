import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[libIconButton]',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
