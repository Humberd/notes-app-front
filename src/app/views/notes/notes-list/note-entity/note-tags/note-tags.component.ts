import { Component, Input } from '@angular/core';
import { NoteTagDto } from '../../../_models/notes';

@Component({
  selector: 'app-note-tags',
  templateUrl: './note-tags.component.html',
  styleUrls: ['./note-tags.component.scss'],
})
export class NoteTagsComponent {
  @Input() tags: NoteTagDto[];

}
