import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from 'composite-library/lib/services/tags-refresher.service';

@Component({
  selector: 'brx-note-created',
  templateUrl: './note-created.component.html',
  styleUrls: ['./note-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [TagsRefresherService],
})
export class NoteCreatedComponent implements OnInit {

  constructor(private tagsRefresherService: TagsRefresherService) {
  }

  ngOnInit() {
    this.tagsRefresherService.start();
  }

}
