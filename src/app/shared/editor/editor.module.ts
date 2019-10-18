import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEditorComponent } from './editor/editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
  ],
  declarations: [AppEditorComponent],
  exports: [AppEditorComponent],
})
export class EditorModule {
}
