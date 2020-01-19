import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

let inputCounter = 0;

@Component({
  selector: 'lib-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;

  readonly id = `input-${++inputCounter}`;

  constructor() {
  }

  ngOnInit() {
  }

}
