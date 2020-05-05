import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControlValueAccessor } from '@ng-boost/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagDomainService } from '@domain/entity/tag/service/tag-domain.service';
import { NoteDomainService } from '@domain/entity/note/service/note-domain.service';

@Component({
  selector: 'brx-tags-autocompleter',
  templateUrl: './tags-autocompleter.component.html',
  styleUrls: ['./tags-autocompleter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: TagsAutocompleterComponent, multi: true},
  ],
})
export class TagsAutocompleterComponent extends AbstractControlValueAccessor<string[]> implements OnInit {
  allTags: string[];
  autocompleteInnerControl = new FormControl('');
  autocompleteFormGroup = new FormGroup({autocompleteInnerControl: this.autocompleteInnerControl});

  constructor(
    private tagDomainService: TagDomainService,
    private noteDomainService: NoteDomainService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.tagDomainService.readList()
      .subscribe(tags => {
        this.allTags = tags.data.map(tag => tag.name);
        this.changeDetectorRef.markForCheck();
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

    this.value = [
      ...this.value,
      newTagName,
    ];
    this.autocompleteInnerControl.reset();
  }

  removeTag(tagName: string) {
    this.value = this.value.filter(it => it.toLowerCase() !== tagName.toLowerCase());
  }


  writeValue(obj: any) {
    super.writeValue(obj);

    this.changeDetectorRef.markForCheck();
  }
}
