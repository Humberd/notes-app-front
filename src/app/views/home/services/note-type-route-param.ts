import { RouteParam } from '@ng-boost/core';
import { Injectable } from '@angular/core';
import { NoteType } from 'domains/lib/note/models/note-types';

export const noteTypeParamName = 'noteType';

@Injectable()
export class NoteTypeRouteParam extends RouteParam<NoteType> {
  protected paramName(): string {
    return noteTypeParamName;
  }
}
