import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionConfig } from 'common-library/lib/context-menu/models/optionConfig';
import { TagOptionsController } from '../../../common/tag-options/tag-options';
import { NoteTag } from 'domains/lib/note/models/note-tag';

@Component({
  selector: 'app-note-tag',
  templateUrl: './note-tag.component.html',
  styleUrls: ['./note-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TagOptionsController],
})
export class NoteTagComponent {
  @Input() tag: NoteTag;
  @Input() removable: boolean;
  @Input() contextMenuDisabled: boolean;

  @Output() removed = new EventEmitter();
  tagOptions: OptionConfig<NoteTag>[];

  constructor(tagOptionsController: TagOptionsController) {
    this.tagOptions = tagOptionsController.getOptions();
  }

}
