import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../../../domains/note/models/note';

@Component({
  selector: 'app-note-content-preview',
  templateUrl: './note-content-preview.component.html',
  styleUrls: ['./note-content-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentPreviewComponent {
  @Input() note: Note;

}
