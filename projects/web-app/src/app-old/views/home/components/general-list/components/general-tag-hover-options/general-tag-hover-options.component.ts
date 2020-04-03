import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OptionConfig } from 'common-library/lib/context-menu/models/optionConfig';
import { Tag } from 'domains/lib/tag/models/tag.model';

@Component({
  selector: 'app-general-tag-hover-options',
  templateUrl: './general-tag-hover-options.component.html',
  styleUrls: ['./general-tag-hover-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralTagHoverOptionsComponent {
  @Input() tag: Tag;
  @Input() tagOptions: OptionConfig<Tag>[];

  trackByTagOption(index: number, option: OptionConfig<Tag>) {
    return option.label;
  }

  onClick(event: MouseEvent, option: OptionConfig<Tag>) {
    event.stopPropagation();
    option.action(this.tag);
  }

}
