import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, NgZone, ViewChild } from '@angular/core';
import EditorLib from 'tui-editor';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Destroy$ } from '@ng-boost/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
      multi: true,
    },
  ],
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor {
  @Destroy$() private readonly destroy$ = new Subject();
  private editor: tuiEditor.Editor | tuiEditor.Viewer;
  private _content: string;
  @Input()
  set content(value: string) {
    this._content = value;

    if (this.editor) {
      this.editor.setValue(value);
    }
  }

  @Input() isEditor = false;
  @Input() placeholder: string;

  @Input() formControl: FormControl;

  @ViewChild('editorSection', {static: true}) editorSection: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
  ) {
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.editor = EditorLib.factory({
        el: this.editorSection.nativeElement,
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        initialValue: this._content || (this.formControl && this.formControl.value),
        viewer: !this.isEditor,
        placeholder: this.placeholder,
      });

      this.editor.on('change', () => {
        this.zone.run(() => {
          if (this.formControl) {
            this.formControl.setValue((this.editor as any).getValue());
          }
          this.cdr.markForCheck();
        });
      });

      if (this.formControl) {
        this.formControl.valueChanges
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe(newValue => this.editor.setValue(newValue));
      }
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
