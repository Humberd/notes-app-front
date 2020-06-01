import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewList } from '@domain/common/view-list';
import { GroupView } from '@domain/entity/group/view/group-view';

@Injectable({
  providedIn: 'root',
})
export class GroupDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  readList(): Observable<ViewList<GroupView>> {
    return this.httpClient.get<ViewList<GroupView>>(`${this.baseUrl}/groups`);
  }
}
