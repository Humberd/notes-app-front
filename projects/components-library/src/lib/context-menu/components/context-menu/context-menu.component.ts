import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { OptionConfig } from 'components-library/lib/context-menu/models/optionConfig';

@Component({
  selector: 'lib-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent<T> {
  @Input() options: OptionConfig<T>[];
  @Input() item: T;

  @ViewChild(MatMenu, {static: true}) matMenu: MatMenu;

  trackBy(index: number, item: OptionConfig<T>) {
    return item.label;
  }

}
