import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ViewSwitcherConfig {
  id: string;
  labelTK: string;
  icon: string;
}

@Injectable()
export class NoteViewSwitcherService {
  readonly availableViews: ViewSwitcherConfig[] = [
    {
      id: 'code',
      labelTK: 'common.raw',
      icon: 'code',
    },
    {
      id: 'split',
      labelTK: 'common.split',
      icon: 'vertical_split',
    },
    {
      id: 'preview',
      labelTK: 'common.preview',
      icon: 'insert_drive_file',
    },
  ];

  private readonly _selectedView$ = new BehaviorSubject<string>('code');
  readonly selectedView$ = this._selectedView$.asObservable();

  constructor() {
  }

  select(id: string) {
    this._selectedView$.next(id);
  }
}
