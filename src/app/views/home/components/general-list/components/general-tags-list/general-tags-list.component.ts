import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PanelExpansionStatus } from 'src/app/views/home/models/panel-expansion-status';
import { OptionConfig } from 'components-library/lib/context-menu/models/optionConfig';
import { Tag } from 'domains/lib/tag/models/tag.model';
import { TagOptionsController } from '../../../../../../shared/common/tag-options/tag-options';
import { TagsRefresherService } from '../../../../services/tags-refresher.service';

@Component({
  selector: 'app-general-tags-list',
  templateUrl: './general-tags-list.component.html',
  styleUrls: ['./general-tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralTagsListComponent {
  @Input() panelExpansionStatus: PanelExpansionStatus;

  tagOptions: OptionConfig<Tag>[];

  constructor(
    private tagOptionsController: TagOptionsController,
    public tagsRefresherService: TagsRefresherService,
  ) {
    this.tagOptions = this.tagOptionsController.getOptions();
  }

  trackByTag(index: number, tag: Tag) {
    return tag.id;
  }

}
