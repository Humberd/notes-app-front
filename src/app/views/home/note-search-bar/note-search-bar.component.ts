import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IndexedDbLayerService } from '../../../core/notes/storage/indexed-db-layer.service';
import { NotesRefresherService } from '../_services/notes-refresher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-search-bar',
  templateUrl: './note-search-bar.component.html',
  styleUrls: ['./note-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteSearchBarComponent {

  constructor(
    private indexedDbLayerService: IndexedDbLayerService,
    private notesRefresherService: NotesRefresherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  createNew() {
    this.indexedDbLayerService
      .add({
        content: '',
        title: '',
        tags: [],
      })
      .subscribe(note => {
        this.router.navigate([note.id], {relativeTo: this.activatedRoute});
        this.notesRefresherService.refresh();
      });
  }

}
