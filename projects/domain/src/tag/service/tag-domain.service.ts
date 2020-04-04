import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewList } from '../../common/view-list';
import { TagView } from '../view/tag-view';
import { Observable } from 'rxjs';
import { TagPatchRequest } from '../request/tag-patch-request';

@Injectable({
  providedIn: 'root',
})
export class TagDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  readList(): Observable<ViewList<TagView>> {
    return this.httpClient.get<ViewList<TagView>>(`${this.baseUrl}/tags`);
  }

  patch(body: TagPatchRequest): Observable<TagView> {
    return this.httpClient.patch<TagView>(`${this.baseUrl}/tags`, body);
  }
}
