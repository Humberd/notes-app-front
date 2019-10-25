import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteTag } from '../../../models/note';
import { OptionConfig } from '../optionConfig';
import { TagOptions } from '../tag-options/tag-options';

@Component({
  selector: 'app-note-tag',
  templateUrl: './note-tag.component.html',
  styleUrls: ['./note-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[style.background-color]': 'tag.color',
    role: 'list-item',
    '[class.removable]': 'removable',
  },
})
export class NoteTagComponent {
  @Input() tag: NoteTag;
  @Input() removable: boolean;
  @Output() removed = new EventEmitter<NoteTag>();

  tagOptions: OptionConfig<NoteTag>[];

  constructor() {
    this.tagOptions = new TagOptions().getOptions();
  }

}
