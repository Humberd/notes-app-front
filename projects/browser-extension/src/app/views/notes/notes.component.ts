import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChromeApiBridgeService } from '../../services/chrome-api/chrome-api-bridge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'domains/lib/note/services/notes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'brx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService,
  ) {
    chromeApiBridgeService.getCurrentTab()
      .pipe(
        switchMap(currentTab => this.notesService.readByUrl(currentTab.url)),
      )
      .subscribe({
        next: note => {
          this.router.navigate(['./created', note.id], {relativeTo: this.activatedRoute});
        },
        error: err => {
          console.warn(err);
          this.router.navigate(['./not-created'], {relativeTo: this.activatedRoute});
        },
      });
  }

}
