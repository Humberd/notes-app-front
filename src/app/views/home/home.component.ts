import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly resizeAreaWidth = 7;

  generalPanelMinWidth = 100;
  generalPanelWidth = 200;

  notesPanelMinWidth = 100;
  notesPanelWidth = 200;

  generalPanelValidator = (resizeEvent: ResizeEvent) => {
    return resizeEvent.rectangle.width >= this.generalPanelMinWidth;
  };

  generalPanelResizeEnd(event: ResizeEvent) {
    this.generalPanelWidth = event.rectangle.width;
  }


  notesPanelValidator = (resizeEvent: ResizeEvent) => {
    return resizeEvent.rectangle.width >= this.notesPanelMinWidth;
  };

  notesPanelResizeEnd(event: ResizeEvent) {
    this.notesPanelWidth = event.rectangle.width;
  }
}
