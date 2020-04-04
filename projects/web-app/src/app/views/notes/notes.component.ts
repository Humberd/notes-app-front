import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    TagsRefresherService,
    NotesRefresherService
  ],
})
export class NotesComponent implements OnInit {

  constructor(
    private tagsRefresherService: TagsRefresherService,
    private notesRefresherService: NotesRefresherService,
  ) {
  }

  ngOnInit(): void {
    this.tagsRefresherService.start();
    this.notesRefresherService.start();
  }

}
