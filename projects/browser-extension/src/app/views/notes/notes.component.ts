import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NoteView } from '@domain/entity/note/view/note-view';
import { TagsRefresherService } from './service/tags-refresher.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { ChromeInternalMessageType } from '@composite-library/lib/chrome/internal-message/model/internal-message-type';
import { ChromeInternalMessageService } from '@composite-library/lib/chrome/internal-message/chrome-internal-message.service';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';
import { WorkspaceDomainService } from '@domain/entity/workspace/service/workspace-domain.service';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';

interface NotesFormsValues {
  tagNames: string[];
  title: string;
  workspaceIds: string[]
}

@Component({
  selector: 'brx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    TagsRefresherService,
  ],
})
export class NotesComponent extends FormRootController<NotesFormsValues> implements OnInit {
  note: NoteView;
  loading: boolean;
  contentExpanded: boolean;
  allWorkspaces: WorkspaceView[];

  private tempForm: FormControllerConfig<NotesFormsValues> = {
    tagNames: new FormControl([], FormValidators.note.tags),
    title: new FormControl('', FormValidators.note.title),
    workspaceIds: new FormControl([], FormValidators.note.workspaces),
  };

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private chromeInternalMessageService: ChromeInternalMessageService,
    private noteDomainService: NoteDomainService,
    private workspaceDomainService: WorkspaceDomainService,
    private changeDetectorRef: ChangeDetectorRef,
    private tagsRefresherService: TagsRefresherService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.tagsRefresherService.start();
    this.fetchCurrentNote();

    this.workspaceDomainService.readList()
      .subscribe(workspaces => {
        this.allWorkspaces = workspaces.data;
        this.changeDetectorRef.markForCheck();
      });
  }

  private fetchCurrentNote() {
    this.chromeApiBridgeService.getCurrentTab()
      .pipe(
        switchMap(currentTab => this.noteDomainService.readList({url: currentTab.url})),
        switchMap(response => {
          const hasNote = response.data.length > 0;
          if (hasNote) {
            return of(response.data[0]);
          }

          return this.createNote();
        }),
      )
      .subscribe(note => {
        this.note = note;
        this.tempForm.tagNames.setValue(note.tags.map(tag => tag.name));
        this.tempForm.title.setValue(note.title);
        this.tempForm.workspaceIds.setValue(note.workspaces.map(workspace => workspace.id));

        this.changeDetectorRef.markForCheck();

        this.startListeningToFormChanges();
      });
  }

  private startListeningToFormChanges() {
    this.formDefinition.title.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(title => this.noteDomainService.patch(this.note.id, {title})))
      .subscribe();

    this.formDefinition.tagNames.valueChanges
      .pipe(
        switchMap(tagNames =>
          this.noteDomainService.patch(
            this.note.id,
            {tags: tagNames.map(tagName => ({name: tagName}))},
          ),
        )
      )
      .subscribe();

    this.formDefinition.workspaceIds.valueChanges
      .pipe(
        switchMap(workspaceIds =>
          this.noteDomainService.patch(
            this.note.id,
            {workspaces: workspaceIds.map(workspaceId => ({id: workspaceId}))},
          ),
        )
      )
      .subscribe();
  }

  getFormDefinition(): FormControllerConfig<NotesFormsValues> {
    return this.tempForm;
  }

  toggleContentExpand() {
    this.contentExpanded = !this.contentExpanded;
  }

  protected submitAction(values: NotesFormsValues): Observable<any> {
    this.setLoading();
    return this.noteDomainService.patch(this.note.id, {
      tags: values.tagNames.map(tagName => ({name: tagName})),
      title: values.title,
      workspaces: values.workspaceIds.map(workspaceId => ({id: workspaceId})),
    });
  }

  protected onSuccess(success: any) {
    this.setSaved();
  }

  protected onError(err: any) {
    console.error(err);
    this.setSaved();
  }

  async createNote() {
    this.setLoading();
    const currentTab = await this.chromeApiBridgeService.getCurrentTab().toPromise();

    const newNote = await this.noteDomainService.create({
      title: currentTab.title,
      url: currentTab.url,
    }).toPromise();

    this.chromeInternalMessageService.sendMessage(ChromeInternalMessageType.NOTE_CREATED, {
      note: newNote,
    });

    this.setSaved();

    return newNote;
  }

  private setLoading() {
    this.loading = true;
    this.changeDetectorRef.markForCheck();
  }

  private setSaved() {
    this.loading = false;
    this.changeDetectorRef.markForCheck();
  }

}
