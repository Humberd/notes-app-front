import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Destroy$ } from '@ng-boost/core';
import { NotesRefresherService } from '../../services/notes-refresher.service';
import { Note } from '../../../../../../projects/domains/src/lib/note/models/note';

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

  trackBy(index: number, item: Note) {
    return item.id;
  }

}
