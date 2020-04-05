import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { TagView } from '@domain/entity/tag/view/tag-view';

@Component({
  selector: 'app-tags-left-panel',
  templateUrl: './tags-left-panel.component.html',
  styleUrls: ['./tags-left-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsLeftPanelComponent implements OnInit {

  constructor(public tagsRefresherService: TagsRefresherService) {
  }

  ngOnInit(): void {
  }

  trackBy(index: number, tagView: TagView) {
    return tagView.id;
  }

  chooseTag(tag: TagView) {
    console.log(tag);
  }

}
