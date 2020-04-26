import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { NoteView } from '@domain/entity/note/view/note-view';
import { DialogService } from '@web-app/app/dialogs/services/dialog.service';
import { TagMinimalView } from '@domain/entity/tag/view/tag-minimal-view';
import { filter } from 'rxjs/operators';
import { TagsRefresherService } from '@web-app/app/views/notes/service/tags-refresher.service';
import { WorkspacesRefresherService } from '@web-app/app/views/notes/service/workspaces-refresher.service';

@Component({
  selector: 'app-notes-list-panel',
  templateUrl: './notes-list-panel.component.html',
  styleUrls: ['./notes-list-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListPanelComponent implements OnInit {

  constructor(
    public notesRefresherService: NotesRefresherService,
    private tagsRefresherService: TagsRefresherService,
    private workspacesRefresherService: WorkspacesRefresherService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
  }

  trackBy(index: number, item: NoteView) {
    return item.id;
  }

  trackByTag(index: number, item: TagMinimalView) {
    return item.id;
  }

  async editNote(note: NoteView) {
    const dialogRef = await this.dialogService.openEditNoteDialog({
      editedNote: note,
    });
    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(editedNote => {
        this.notesRefresherService.softRefresh();
        this.tagsRefresherService.softRefresh();
        this.workspacesRefresherService.softRefresh();
      });
  }

  async deleteNote(note: NoteView) {
    const dialogRef = await this.dialogService.openDeleteNoteDialog(note);
    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.notesRefresherService.softRefresh();
        this.tagsRefresherService.softRefresh();
        this.workspacesRefresherService.softRefresh();
      })
  }

}
