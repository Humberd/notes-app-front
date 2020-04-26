import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { TagView } from '@domain/entity/tag/view/tag-view';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';

@Component({
  selector: 'app-filters-left-panel',
  templateUrl: './filters-left-panel.component.html',
  styleUrls: ['./filters-left-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersLeftPanelComponent implements OnInit {

  constructor(
    public tagsRefresherService: TagsRefresherService,
    public notesRefresherService: NotesRefresherService,
  ) {
  }

  ngOnInit(): void {
  }

  trackBy(index: number, tagView: TagView) {
    return tagView.id;
  }

  chooseTag(tag: TagView) {
    if (this.notesRefresherService.tagIds.some(it => it === tag.id)) {
      this.notesRefresherService.filterByTags(this.notesRefresherService.tagIds.filter(it => it !== tag.id))
    } else {
      this.notesRefresherService.filterByTags([...this.notesRefresherService.tagIds, tag.id]);
    }
  }

}
