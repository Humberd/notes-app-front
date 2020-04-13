import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionConfig } from 'common-library/lib/context-menu/models/optionConfig';
import { TagMinimalView } from '@domain/entity/tag/view/tag-minimal-view';

@Component({
  selector: 'lib2-note-tag',
  templateUrl: './note-tag.component.html',
  styleUrls: ['./note-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteTagComponent {
  @Input() tag: TagMinimalView;
  @Input() removable: boolean;
  @Input() contextMenuDisabled: boolean;

  @Output() removed = new EventEmitter();
  tagOptions: OptionConfig<TagMinimalView>[];

  constructor() {
    this.tagOptions = [];
  }

}
