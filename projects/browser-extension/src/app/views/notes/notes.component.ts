import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChromeApiBridgeService } from '@composite-library/lib/chrome/bridge/chrome-api-bridge.service';
import { switchMap } from 'rxjs/operators';
import { NoteView } from '@domain/entity/note/view/note-view';
import { TagsRefresherService } from './service/tags-refresher.service';
import { UserDomainService } from '@domain/entity/user/service/user-domain.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';
import { ChromeInternalMessageType } from '@composite-library/lib/chrome/internal-message/model/internal-message-type';
import { ChromeInternalMessageService } from '@composite-library/lib/chrome/internal-message/chrome-internal-message.service';
import { FormControllerConfig, FormRootController } from '@ng-boost/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormValidators } from '@composite-library/lib/form-validators/form.validators';

interface NotesFormsValues {
  tags: string[]
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
  private tempForm: FormControllerConfig<NotesFormsValues> = {
    tags: new FormControl([], FormValidators.note.tags),
  };

  constructor(
    private chromeApiBridgeService: ChromeApiBridgeService,
    private chromeInternalMessageService: ChromeInternalMessageService,
    private noteDomainService: NoteDomainService,
    private myDataDomainService: UserDomainService,
    private changeDetectorRef: ChangeDetectorRef,
    private tagsRefresherService: TagsRefresherService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.tagsRefresherService.start();
    this.fetchCurrentNote();
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
        this.tempForm.tags.setValue(note.tags.map(tag => tag.name));
        this.changeDetectorRef.markForCheck();

        this.rootForm.valueChanges
          .subscribe(() => this.submit());
      });
  }

  getFormDefinition(): FormControllerConfig<NotesFormsValues> {
    return this.tempForm;
  }

  protected submitAction(values: NotesFormsValues): Observable<any> {
    this.setLoading();
    return this.noteDomainService.patch(this.note.id, {
      tags: values.tags.map(tagName => ({name: tagName}))
    });
  }

  protected onSuccess(success: any) {
    this.setSaved()
  }

  protected onError(err: any) {
    console.error(err);
    this.setSaved()
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
