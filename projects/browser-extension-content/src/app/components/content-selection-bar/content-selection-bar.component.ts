import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-selection-bar',
  templateUrl: './content-selection-bar.component.html',
  styleUrls: ['./content-selection-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSelectionBarComponent implements OnInit, OnDestroy {
  selection: Selection;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    document.addEventListener('selectionchange', this.onSelectionChangeListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('selectionchange', this.onSelectionChangeListener);
  }

  onSelectionChangeListener = () => {
    this.selection = document.getSelection();
    this.changeDetectorRef.markForCheck();
  };

}
