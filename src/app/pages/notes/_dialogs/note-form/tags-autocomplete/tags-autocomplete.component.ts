import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tags-autocomplete',
  templateUrl: './tags-autocomplete.component.html',
  styleUrls: ['./tags-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsAutocompleteComponent),
      multi: true
    },
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: {
        autoActiveFirstOption: true
      }
    }
  ]
})
export class TagsAutocompleteComponent implements OnInit, ControlValueAccessor {
  selectable = false;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() formControl: FormControl;

  private allTags$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  // tslint:disable-next-line:variable-name
  @Input()
  set allTags(allTags: string[]) {
    this.allTags$.next(allTags);
  }

  inputCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;


  ngOnInit(): void {
    this.filteredTags = this.allTags$
      .pipe(
        switchMap(allTags => this.inputCtrl.valueChanges
          .pipe(
            startWith(this.inputCtrl.value),
            map((currentInput) => {
              const selectedTags: string[] = this.formControl.value;
              const notUsedTags = allTags.filter(it => !selectedTags.includes(it));
              if (!currentInput) {
                return notUsedTags;
              }

              return notUsedTags.filter(it => it.includes(currentInput));
            }),
          )
        )
      );
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = (event.value || '').trim();

      const selectedTags: string[] = this.formControl.value;
      if (selectedTags.includes(value.toLowerCase())) {
        return;
      }


      // Add our tag
      if (value) {
        this.formControl.patchValue([...this.formControl.value, value]);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

    }
  }

  remove(tag: string): void {
    const currentTags: string[] = [...this.formControl.value];

    this.formControl.patchValue(currentTags.filter(it => it !== tag));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.formControl.patchValue([...this.formControl.value, event.option.viewValue]);
    this.fruitInput.nativeElement.value = '';
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

}
