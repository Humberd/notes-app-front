import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../models/note';

@Component({
  selector: 'app-note-tag',
  templateUrl: './note-tag.component.html',
  styleUrls: ['./note-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[style.background-color]': 'tag.color',
    role: 'list-item',
  },
})
export class NoteTagComponent {
  @Input() tag: Tag;
  @Input() removable: boolean;
  @Output() removed = new EventEmitter<Tag>();

}
