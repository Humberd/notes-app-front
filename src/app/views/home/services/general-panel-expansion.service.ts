import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanelExpansionStatus } from '../models/panel-expansion-status';

@Injectable()
export class GeneralPanelExpansionService {
  private readonly _status$ = new BehaviorSubject<PanelExpansionStatus>(PanelExpansionStatus.VISIBLE);
  status$ = this._status$.asObservable();

  get status() {
    return this._status$.value;
  }

  updateStatus(status: PanelExpansionStatus): void {
    this._status$.next(status);
  }

  hide(): void {
    this.updateStatus(PanelExpansionStatus.HIDDEN);
  }

  show(): void {
    this.updateStatus(PanelExpansionStatus.VISIBLE);
  }

}
