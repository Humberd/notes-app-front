import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Editor from 'tui-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {
  @Input() content: string;
  @Input() isEditor = false;

  @ViewChild('editorSection', {static: true}) editorSection: ElementRef;

  ngAfterViewInit(): void {
    Editor.factory({
      el: this.editorSection.nativeElement,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: this.content,
      viewer: !this.isEditor
    });
  }

}
