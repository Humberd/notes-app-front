import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesRefresherService } from '@web-app/app/views/notes/service/notes-refresher.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { DialogService } from '@web-app/app/dialogs/services/dialog.service';
import { Router } from '@angular/router';
import { AuthorizationHandlerService } from '@composite-library/lib/auth/authorization-handler.service';

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
    private router: Router
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
    const dialogRef = await this.dialogService.openCreateNoteDialog();
    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => {
        this.notesRefresherService.softRefresh();
        this.router.navigate(['/my-notes', result.id])
      });
  }
}
