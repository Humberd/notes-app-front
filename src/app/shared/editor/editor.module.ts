import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEditorComponent } from './editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AppEditorComponent],
  exports: [AppEditorComponent],
})
export class EditorModule {
}
