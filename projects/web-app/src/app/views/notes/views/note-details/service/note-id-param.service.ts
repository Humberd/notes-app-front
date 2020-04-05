import { Injectable } from '@angular/core';
import { RouteParam } from '@ng-boost/core';

@Injectable()
export class NoteIdParamService extends RouteParam {
  protected paramName(): string {
    return 'id';
  }
}
