import { RouteParam } from '@ng-boost/core';
import { Injectable } from '@angular/core';

export const noteTypeParamName = 'noteType';
export const allowedNoteTypes = ['all', 'starred', 'trash'] as const;
export type NoteType = typeof allowedNoteTypes[number];

@Injectable()
export class NoteTypeRouteParam extends RouteParam<NoteType> {
  protected paramName(): string {
    return noteTypeParamName;
  }
}
