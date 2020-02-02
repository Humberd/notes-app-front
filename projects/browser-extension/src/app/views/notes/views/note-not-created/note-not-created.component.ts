import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'domains/lib/note/services/notes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'brx-note-not-created',
  templateUrl: './note-not-created.component.html',
  styleUrls: ['./note-not-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteNotCreatedComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService,
  ) {
  }

  savePage() {
    this.notesService.create()
      .pipe(
        switchMap(note => this.notesService.update(note.id, {
          title: 'foobar',
          content: '',
          webPageUrl: '',
        })),
      )
      .subscribe(note => {
        this.router.navigate(['../created', note.id], {
          relativeTo: this.activatedRoute,
        });
      });

  }
}
