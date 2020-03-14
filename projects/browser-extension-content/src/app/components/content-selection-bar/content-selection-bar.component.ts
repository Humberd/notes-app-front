import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-selection-bar',
  templateUrl: './content-selection-bar.component.html',
  styleUrls: ['./content-selection-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSelectionBarComponent implements OnInit, OnDestroy {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<string>();

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

  handleSave() {
    this.save.next(this.selection.toString());
  }

  handleCancel() {
    this.cancel.next();
  }

}
