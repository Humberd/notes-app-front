import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewSwitcherConfig } from 'components-library/lib/view-switcher/models/view-switcher-config';

@Injectable()
export class ViewSwitcherService {
  availableViews: ViewSwitcherConfig[];

  private readonly _selectedView$ = new BehaviorSubject<string>(localStorage.getItem('notes-app-view-switcher'));
  readonly selectedView$ = this._selectedView$.asObservable();

  get selectedView(): string {
    return this._selectedView$.value;
  }

  constructor() {
    if (!this.selectedView) {
      this.select('code');
    }
  }

  select(id: string) {
    this._selectedView$.next(id);
    localStorage.setItem('notes-app-view-switcher', id);
  }

  setAvailableViews(config: ViewSwitcherConfig[]) {
    this.availableViews = config;
  }
}
