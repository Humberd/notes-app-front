import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from '../../../../models/note';

@Component({
  selector: 'app-tags-bar',
  templateUrl: './tags-bar.component.html',
  styleUrls: ['./tags-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsBarComponent implements OnInit {
  @Input() tags: Tag[];
  @Input() removable: boolean;
  @Output() removed = new EventEmitter<Tag>();
  @Output() added = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}
