import { RouteParam } from '@ng-boost/core';
import { Injectable } from '@angular/core';

export const noteIdParamName = 'noteId';

@Injectable()
export class NoteIdRouteParam extends RouteParam {
  protected paramName(): string {
    return noteIdParamName;
  }
}
