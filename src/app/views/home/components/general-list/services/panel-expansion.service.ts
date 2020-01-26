import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanelExpansionStatus } from '../models/panel-expansion-status';

@Injectable()
export class PanelExpansionService {
  private readonly _status$ = new BehaviorSubject<PanelExpansionStatus>(PanelExpansionStatus.VISIBLE);
  status$ = this._status$.asObservable();

  get status() {
    return this._status$.value;
  }

  updateStatus(status: PanelExpansionStatus): void {
    this._status$.next(status);
  }

}
