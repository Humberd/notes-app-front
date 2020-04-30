import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { TagView } from '@domain/entity/tag/view/tag-view';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { WorkspacesRefresherService } from '@web-app/app/views/notes/service/workspaces-refresher.service';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';
import { DialogService } from '@web-app/app/dialogs/services/dialog.service';
import { filter } from 'rxjs/operators';
import { NotesSearchService } from '@web-app/app/views/notes/service/notes-search.service';

@Component({
  selector: 'app-filters-left-panel',
  templateUrl: './filters-left-panel.component.html',
  styleUrls: ['./filters-left-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersLeftPanelComponent implements OnInit {
  selectedTags: { [tagId: string]: boolean } = {};

  constructor(
    public tagsRefresherService: TagsRefresherService,
    public notesRefresherService: NotesRefresherService,
    public notesSearchService: NotesSearchService,
    public workspacesRefresherService: WorkspacesRefresherService,
    private dialogService: DialogService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.notesSearchService.attributes$
      .subscribe(attributes => {
        this.selectedTags = attributes.tagIds.reduce((previousValue, currentValue) => {
          previousValue[currentValue] = true;

          return previousValue;
        }, {});
        this.changeDetectorRef.markForCheck();
      });
  }

  trackByTag(index: number, tagView: TagView) {
    return tagView.id;
  }

  trackByWorkspace(index: number, workspaceView: WorkspaceView) {
    return workspaceView.id;
  }

  chooseTag(tag: TagView) {
    if (this.notesSearchService.attributes.tagIds.some(it => it === tag.id)) {
      this.notesSearchService.patch({tagIds: []});
    } else {
      this.notesSearchService.patch({tagIds: [tag.id]});
    }
  }

  chooseWorkspace(workspace: WorkspaceView) {
    this.notesSearchService.patch({workspaceId: workspace.id});
  }

  chooseAllWorkspaces() {
    this.notesSearchService.patch({workspaceId: null});
  }

  async createWorkspace() {
    const dialogRef = await this.dialogService.openCreateWorkspaceDialog();

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.workspacesRefresherService.softRefresh();
      });
  }

  async editWorkspace(workspace: WorkspaceView) {
    const dialogRef = await this.dialogService.openEditWorkspaceDialog({editedWorkspace: workspace});

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.workspacesRefresherService.softRefresh();
      });
  }

  async deleteWorkspace(workspace: WorkspaceView) {
    const dialogRef = await this.dialogService.openDeleteWorkspaceDialog(workspace);

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.workspacesRefresherService.softRefresh();
      });
  }

  sortBy(key: keyof TagView, direction: 'asc' | 'desc') {

  }

  async createTag() {
    const dialogRef = await this.dialogService.openCreateTagDialog();

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.tagsRefresherService.softRefresh();
        this.notesRefresherService.softRefresh();
      });
  }
}
