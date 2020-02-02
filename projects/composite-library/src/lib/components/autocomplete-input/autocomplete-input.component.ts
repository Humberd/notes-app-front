import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormController, FormControllerConfig } from '@ng-boost/core';
import { FormControl } from '@angular/forms';
import { FormValidators } from 'composite-library/lib/form-validators/form.validators';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteInputFormValues } from 'composite-library/lib/components/autocomplete-input/models/autocomplete-input-form-values';

@Component({
  selector: 'lib2-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteInputComponent extends FormController<AutocompleteInputFormValues> implements OnInit {

  @Input()
  set ignoredValues(ignoredTagNames: string[]) {
    this.ignoredValues$.next(ignoredTagNames);
  }

  get ignoredValues() {
    return this.ignoredValues$.value;
  }

  @Input()
  set allValues(allTagNames: string[]) {
    this.allValues$.next(allTagNames);
  }

  get allValues() {
    return this.allValues$.value;
  }

  autocompleteValues$: Observable<string[]>;
  private readonly ignoredValues$ = new BehaviorSubject<string[]>([]);
  private readonly allValues$ = new BehaviorSubject<string[]>([]);

  ngOnInit() {
    super.ngOnInit();

    this.autocompleteValues$ = this.ignoredValues$
      .pipe(
        switchMap(() => this.allValues$),
        filter(allValues => !!allValues),
        switchMap(allValues => this.getInputLcValue$()
          .pipe(
            // filter values that matches what user currently has in the input
            map(newValueLc => allValues.filter(value => value.toLowerCase().includes(newValueLc))),
            // filter values that are already selected
            map(matchingValues => matchingValues.filter(value => this.ignoredValues.every(it => it !== value))),
          ),
        ),
      );
  }

  getFormDefinition(): FormControllerConfig<AutocompleteInputFormValues> {
    return {
      value: new FormControl('', FormValidators.tag.name),
    };
  }

  resetForm() {
    this.formDefinition.value.reset('');
  }

  private getInputLcValue$(): Observable<string> {
    return this.formDefinition.value.valueChanges
      .pipe(
        startWith(this.formDefinition.value.value as string),
        map((value: string) => value.toLowerCase()),
      );
  }

}
