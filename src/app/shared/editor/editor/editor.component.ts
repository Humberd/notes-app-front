import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, NgZone, ViewChild } from '@angular/core';
import EditorLib from 'tui-editor';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
// import Viewer = tuiEditor.Viewer;
// import Editor = tuiEditor.Editor;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor {
  @Input() content: string;
  @Input() isEditor = false;
  @Input() placeholder: string;

  @Input() formControl: FormControl;

  private editor: any;

  @ViewChild('editorSection', {static: true}) editorSection: ElementRef;

  constructor(private cdr: ChangeDetectorRef,
              private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.editor = EditorLib.factory({
        el: this.editorSection.nativeElement,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        initialValue: this.content,
        viewer: !this.isEditor,
        placeholder: this.placeholder,
      });

      // if (this.editor instanceof Editor) {
      const editor = this.editor;
      this.editor.on('change', () => {
        this.zone.run(() => {
          this.formControl.setValue(editor.getValue());
          this.cdr.markForCheck();
        });
      });
      // }

    });
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

}
