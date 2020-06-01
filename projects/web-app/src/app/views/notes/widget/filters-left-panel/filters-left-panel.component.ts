import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { TagView } from '@domain/entity/tag/view/tag-view';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { WorkspacesRefresherService } from '@web-app/app/views/notes/service/workspaces-refresher.service';
import { DialogService } from '@web-app/app/dialogs/services/dialog.service';
import { filter } from 'rxjs/operators';
import { NotesSearchService } from '@web-app/app/views/notes/service/notes-search.service';
import { GroupsRefresherService } from '@web-app/app/views/notes/service/groups-refresher.service';
import { GroupView } from '@domain/entity/group/view/group-view';

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
    public groupsRefresherService: GroupsRefresherService,
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

  trackByGroup(index: number, workspaceView: GroupView) {
    return workspaceView.id;
  }

  chooseTag(tag: TagView) {
    if (this.notesSearchService.attributes.tagIds.some(it => it === tag.id)) {
      this.notesSearchService.patch({tagIds: []});
    } else {
      this.notesSearchService.patch({tagIds: [tag.id]});
    }
  }

  chooseGroup(group: GroupView) {
    this.notesSearchService.patch({groupId: group.id});
  }

  chooseAllWorkspaces() {
    this.notesSearchService.patch({workspaceId: null});
  }

  async createGroup() {
    const dialogRef = await this.dialogService.openCreateGroupDialog();

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.groupsRefresherService.softRefresh();
      });
  }

  async editGroup(group: GroupView) {
    // const dialogRef = await this.dialogService.openEditWorkspaceDialog({editedWorkspace: group});
    //
    // dialogRef.afterClosed()
    //   .pipe(filter(Boolean))
    //   .subscribe(() => {
    //     this.workspacesRefresherService.softRefresh();
    //   });
  }

  async deleteGroup(group: GroupView) {
    // const dialogRef = await this.dialogService.openDeleteWorkspaceDialog(group);
    //
    // dialogRef.afterClosed()
    //   .pipe(filter(Boolean))
    //   .subscribe(() => {
    //     this.workspacesRefresherService.softRefresh();
    //   });
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

  async editTag(tag: TagView) {
    const dialogRef = await this.dialogService.openEditTagDialog({
      editedTag: tag,
    });

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.tagsRefresherService.softRefresh();
        this.notesRefresherService.softRefresh();
      });
  }

  async deleteTag(tag: TagView) {
    const dialogRef = await this.dialogService.openDeleteTagDialog(tag);

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.tagsRefresherService.softRefresh();

        if (this.notesSearchService.attributes.tagIds.includes(tag.id)) {
          this.notesSearchService.patch({
            tagIds: this.notesSearchService.attributes.tagIds.filter(tagId => tagId !== tag.id),
          });
        } else {
          this.notesRefresherService.softRefresh();
        }
      });
  }
}
