import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    TagsRefresherService,
  ],
})
export class NotesComponent implements OnInit {

  constructor(private tagsRefresherService: TagsRefresherService) {
  }

  ngOnInit(): void {
    this.tagsRefresherService.start();
  }

}
