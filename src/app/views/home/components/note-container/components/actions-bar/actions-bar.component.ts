import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '../../../../../../domains/note/models/note';
import { FormControl } from '@angular/forms';
import { FormValidators } from '../../../../../../form-validators/form.validators';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsBarComponent {
  @Input() note: Note;

  titleControl = new FormControl('', FormValidators.note.title);

}
