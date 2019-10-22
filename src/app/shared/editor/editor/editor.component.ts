import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppEditorComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  content: string;
  editorOptions: IEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'markdown',
    wordWrap: 'on',
    automaticLayout: true,
  };

  propagateChange = (_: any) => {
  };

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.content = obj;
    this.cdr.markForCheck();
  }

  onEditorValueChange(newContent: string) {
    // Monaco editor is run outside Angular zone.
    // This is a fix to manually handle change propagation in formControl
    // https://github.com/atularen/ngx-monaco-editor/pull/135
    this.ngZone.run(() => {
      this.propagateChange(newContent);
    });
  }
}
