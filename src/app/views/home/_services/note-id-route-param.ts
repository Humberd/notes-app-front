import { RouteParam } from '@ng-boost/core';
import { Injectable } from '@angular/core';

@Injectable()
export class NoteIdRouteParam extends RouteParam {
  protected paramName(): string {
    return 'noteId';
  }
}
