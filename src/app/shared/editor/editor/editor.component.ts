import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor';
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
})
export class AppEditorComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() formControl: FormControl;

  editorOptions: IEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'markdown',
    wordWrap: 'on',
    automaticLayout: true,
  };

  @ViewChild(EditorComponent, {static: true}) editorComponent: EditorComponent;


  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

}
