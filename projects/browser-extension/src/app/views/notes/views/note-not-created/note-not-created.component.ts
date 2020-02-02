import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) {
  }

  savePage() {
    this.router.navigate(['../created'], {
      relativeTo: this.activatedRoute,
    });
  }
}
