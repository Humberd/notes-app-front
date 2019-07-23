import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../_services/search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private readonly $destroy = new Subject();
  searchInputControl = new FormControl();

  constructor(private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this.$destroy),
        debounceTime(400)
      )
      .subscribe(value => this.searchService.updateTextQuery(value));
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }

}
