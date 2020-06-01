import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { WorkspacesRefresherService } from '@web-app/app/views/notes/service/workspaces-refresher.service';
import { NotesSearchService } from '@web-app/app/views/notes/service/notes-search.service';
import { GroupsRefresherService } from '@web-app/app/views/notes/service/groups-refresher.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    TagsRefresherService,
    NotesRefresherService,
    WorkspacesRefresherService,
    NotesSearchService,
    GroupsRefresherService
  ],
})
export class NotesComponent implements OnInit {
  constructor(
    private tagsRefresherService: TagsRefresherService,
    private notesRefresherService: NotesRefresherService,
    private workspacesRefresherService: WorkspacesRefresherService,
    private groupsRefresherService: GroupsRefresherService
  ) {
  }

  ngOnInit(): void {
    this.tagsRefresherService.start();
    this.notesRefresherService.start();
    this.workspacesRefresherService.start();
    this.groupsRefresherService.start()
  }

}
