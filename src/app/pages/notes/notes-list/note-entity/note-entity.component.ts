import { Component, Input } from '@angular/core';
import { NoteDto } from '../../_models/notes';

@Component({
  selector: 'app-note-entity',
  templateUrl: './note-entity.component.html',
  styleUrls: ['./note-entity.component.scss']
})
export class NoteEntityComponent {
  @Input() note: NoteDto;

}
