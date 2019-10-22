import { Directive, Input } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material';

@Directive({
  selector: `[appContextMenuTriggerFor]`,
  host: {
    class: 'mat-menu-trigger',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'menuOpen || null',
    '[attr.aria-controls]': 'menuOpen ? menu.panelId : null',
    '(mousedown)': '_handleMousedown($event)',
    '(contextmenu)': '_handleClick($event)',
  },
  exportAs: 'appContextMenuTrigger',
})
export class ContextMenuTriggerFor extends MatMenuTrigger {
  @Input('appContextMenuTriggerFor')
  set trigger(menu: MatMenu) {
    this.menu = menu;
  }

  _handleClick(event: MouseEvent): void {
    event.preventDefault();
    super._handleClick(event);
  }
}
