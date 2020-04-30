import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteView } from '@domain/entity/note/view/note-view';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { ChromeMessageMultiplexerService } from '@composite-library/lib/chrome/message-multiplexer/chrome-message-multiplexer.service';
import { ChromeMessageType } from '@composite-library/lib/chrome/message-multiplexer/model/message-type';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { environment } from '../../../../../environments/environment';
import { WorkspaceDomainService } from '@domain/entity/workspace/service/workspace-domain.service';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';

interface NoteCreatedFormValues {
  title: string,
  content: string,
  tags: string[],
  workspaceIds: string[]
}

@Component({
  selector: 'brx-note-created',
  templateUrl: './note-created.component.html',
  styleUrls: ['./note-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ],
})
export class NoteCreatedComponent extends FormRootController<NoteCreatedFormValues> implements OnInit {
  @Input() note: NoteView;
  @Input() tabId: number;
  @Output() noteDeleted = new EventEmitter();

  autocompleteInnerControl = new FormControl('');
  autocompleteFormGroup = new FormGroup({autocompleteInnerControl: this.autocompleteInnerControl});
  allTags: string[];
  contentExpanded: boolean;
  allWorkspaces: WorkspaceView[];

  constructor(
    private tagDomainService: TagDomainService,
    private noteDomainService: NoteDomainService,
    private workspaceDomainService: WorkspaceDomainService,
    private chromeMessageMultiplexerService: ChromeMessageMultiplexerService,
    private chromeApiBridgeService: ChromeApiBridgeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.contentExpanded = !!this.note.content;

    this.tagDomainService.readList()
      .subscribe(tags => {
        this.allTags = tags.data.map(tag => tag.name);
        this.changeDetectorRef.markForCheck();
      });

    this.workspaceDomainService.readList()
      .subscribe(workspaces => {
        this.allWorkspaces = workspaces.data;
        this.changeDetectorRef.markForCheck();
      });
  }

  getFormDefinition(): FormControllerConfig<NoteCreatedFormValues> {
    return {
      title: new FormControl(this.note.title, FormValidators.note.title),
      tags: new FormControl(this.note.tags.map(tag => tag.name), FormValidators.note.tags),
      content: new FormControl(this.note.content, FormValidators.note.content),
      workspaceIds: new FormControl(this.note.workspaces.map(workspace => workspace.id), FormValidators.note.workspaces),
    };
  }

  protected submitAction(values: NoteCreatedFormValues): Observable<any> {
    return this.noteDomainService.patch(this.note.id, {
      title: values.title,
      content: values.content,
      tags: values.tags.map(tagName => ({name: tagName})),
      workspaces: values.workspaceIds.map(workspaceId => ({id: workspaceId})),
    });
  }

  addTag() {
    if (!this.autocompleteInnerControl.value) {
      return;
    }

    const newTagName = this.autocompleteInnerControl.value.trim();
    if (!newTagName) {
      console.warn('Value cannot be blank');

      return;
    }

    this.formDefinition.tags.setValue([
      ...this.formDefinition.tags.value,
      newTagName,
    ]);
    this.autocompleteInnerControl.reset();
  }

  removeTag(tagName: string) {
    this.formDefinition.tags.setValue(
      this.formDefinition.tags.value.filter(it => it.toLowerCase() !== tagName.toLowerCase()),
    );
  }

  deleteNote() {
    this.noteDomainService.delete(this.note.id)
      .subscribe(() => {
        this.chromeMessageMultiplexerService.sendMessage(ChromeMessageType.NOTE_DELETED, {
          note: this.note,
        });
        this.noteDeleted.emit();
      });
  }

  toggleContentExpand() {
    this.contentExpanded = !this.contentExpanded;
  }

  openInApp() {
    this.chromeApiBridgeService.createTab({
      url: `${environment.webAppUrl}/my-notes/${this.note.id}`,
    });
  }
}
