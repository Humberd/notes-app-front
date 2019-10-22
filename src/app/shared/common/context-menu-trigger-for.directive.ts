import { Directive, Input } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material';
import { OverlayConfig } from '@angular/cdk/overlay';

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
// @ts-ignore
export class ContextMenuTriggerForDirective extends MatMenuTrigger {
  @Input('appContextMenuTriggerFor')
  set trigger(menu: MatMenu) {
    this.menu = menu;
  }

  private currentClickCoords: { x: number, y: number } = {
    x: 0,
    y: 0,
  };

  _handleClick(event: MouseEvent): void {
    event.preventDefault();
    this.currentClickCoords.x = event.x;
    this.currentClickCoords.y = event.y;
    super._handleClick(event);
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      // @ts-ignore
      positionStrategy: this._overlay.position()
      // @ts-ignore
        .flexibleConnectedTo(this.currentClickCoords)
        .withLockedPosition()
        .withTransformOriginOn('.mat-menu-panel, .mat-mdc-menu-panel'),
      backdropClass: this.menu.backdropClass || 'cdk-overlay-transparent-backdrop',
      // @ts-ignore
      scrollStrategy: this._scrollStrategy(),
      // @ts-ignore
      direction: this._dir,
    });
  }


}
