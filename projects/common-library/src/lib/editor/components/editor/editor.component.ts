import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { AbstractControlValueAccessor } from '@ng-boost/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;

@Component({
  selector: 'lib-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent extends AbstractControlValueAccessor<string> {
  readonly defaultEditorOptions: IEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'markdown',
    wordWrap: 'on',
    automaticLayout: true,
  };

  @Input() options: IEditorConstructionOptions = this.defaultEditorOptions;
}
