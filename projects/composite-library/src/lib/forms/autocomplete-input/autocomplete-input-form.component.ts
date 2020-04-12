import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControlValueAccessor } from '@ng-boost/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib2-autocomplete-input-form',
  templateUrl: './autocomplete-input-form.component.html',
  styleUrls: ['./autocomplete-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
    {provide: NG_VALUE_ACCESSOR, useExisting: AutocompleteInputFormComponent, multi: true}
  ],
})
export class AutocompleteInputFormComponent extends AbstractControlValueAccessor<string> implements OnInit {

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

  private getInputLcValue$(): Observable<string> {
    return this.formControl.valueChanges
        .pipe(
            startWith(this.formControl.value as string),
            map((value: string) => (value || '').toLowerCase()),
        );
  }

}
