import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.removable]': 'removable',
  },
})
export class TagComponent {
  @Input() removable: boolean;
  @Output() removed = new EventEmitter();

  onRemove(event: MouseEvent) {
    event.stopPropagation();
    this.removed.emit();
  }

}
