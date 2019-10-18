import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor';
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;
import ICodeEditor = monaco.editor.ICodeEditor;

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
  @Input() content: string;

  @Input() isEditor = false;
  @Input() placeholder: string;

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

  editorInitialized() {
    const editor: ICodeEditor = this.editorComponent['_editor'];
    console.log(editor);
    console.log(editor.getLayoutInfo());
  }
}
