import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MonacoEditorModule,
    ReactiveFormsModule,
  ],
  exports: [EditorComponent],
})
export class EditorModule {
}
