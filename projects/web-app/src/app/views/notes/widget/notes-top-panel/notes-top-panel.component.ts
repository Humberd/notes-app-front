import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DialogService } from '@web-app/app/dialogs/services/dialog.service';

@Component({
  selector: 'app-notes-top-panel',
  templateUrl: './notes-top-panel.component.html',
  styleUrls: ['./notes-top-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'navigation',
  },
})
export class NotesTopPanelComponent implements OnInit {
  searchControl = new FormControl();

  constructor(
    public authorizationHandlerService: AuthorizationHandlerService,
    private notesRefresherService: NotesRefresherService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
      )
      .subscribe(value => {
        this.notesRefresherService.search(value);
      });
  }

  logout() {
    this.authorizationHandlerService.logout();
  }

  async newNote() {
    await this.dialogService.openCreateNoteDialog();
  }
}
