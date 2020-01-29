import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from 'domains/lib/note/models/note';
import { ViewSwitcherService } from 'components-library/lib/view-switcher/services/view-switcher.service';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteContentComponent {
  @Input() note: Note;

  resizeAreaWidth = 7;
  codePanelMinWidth = 100;
  codePanelWidth: number;

  constructor(public viewSwitcherService: ViewSwitcherService) {
  }

  codePanelValidator = (resizeEvent: ResizeEvent) => {
    console.log('resizing');
    return resizeEvent.rectangle.width >= this.codePanelMinWidth;
  };

  codePanelResizeEnd(event: ResizeEvent) {
    this.codePanelWidth = event.rectangle.width;
  }

  getCodePanelSize(): string {
    if (this.viewSwitcherService.selectedView === 'code') {
      return '100%';
    }

    if (!Number.isNaN(this.codePanelWidth) && !this.codePanelWidth) {
      return '50%';
    }

    return `${this.codePanelWidth}px`;
  }

  getPreviewPanelSize(): string {
    if (this.viewSwitcherService.selectedView === 'preview') {
      return '100%';
    }

    if (!Number.isNaN(this.codePanelWidth) && !this.codePanelWidth) {
      return '50%';
    }

    return `calc(100%-${this.codePanelWidth}px)`;
  }

}
