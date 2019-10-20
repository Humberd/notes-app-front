import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Destroy$ } from '@ng-boost/core';
import { NotesRefresherService } from '../_services/notes-refresher.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  @Destroy$() private readonly destroy$ = new Subject();

  constructor(
    public notesRefresher: NotesRefresherService,
  ) {
  }

}
