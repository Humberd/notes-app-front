import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { TagView } from '@domain/entity/tag/view/tag-view';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { WorkspacesRefresherService } from '@web-app/app/views/notes/service/workspaces-refresher.service';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';
import { DialogService } from '@web-app/app/dialogs/services/dialog.service';
import { filter } from 'rxjs/operators';

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
    public workspacesRefresherService: WorkspacesRefresherService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
  }

  trackByTag(index: number, tagView: TagView) {
    return tagView.id;
  }

  trackByWorkspace(index: number, workspaceView: WorkspaceView) {
    return workspaceView.id;
  }

  chooseTag(tag: TagView) {
    if (this.notesRefresherService.tagIds.some(it => it === tag.id)) {
      this.notesRefresherService.filterByTags(this.notesRefresherService.tagIds.filter(it => it !== tag.id));
    } else {
      this.notesRefresherService.filterByTags([...this.notesRefresherService.tagIds, tag.id]);
    }
  }

  async newWorkspace() {
    const dialogRef = await this.dialogService.openCreateWorkspaceDialog();

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.workspacesRefresherService.softRefresh()
      });
  }
}
