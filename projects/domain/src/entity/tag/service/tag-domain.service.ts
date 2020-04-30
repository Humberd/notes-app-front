import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewList } from '@domain/common/view-list';
import { TagView } from '../view/tag-view';
import { Observable } from 'rxjs';
import { TagPatchRequest } from '../request/tag-patch-request';
import { TagCreateRequest } from '@domain/entity/tag/request/tag-create-request';

@Injectable({
  providedIn: 'root',
})
export class TagDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  create(body: TagCreateRequest): Observable<TagView> {
    return this.httpClient.post<TagView>(`${this.baseUrl}/tags`, body);
  }

  readList(): Observable<ViewList<TagView>> {
    return this.httpClient.get<ViewList<TagView>>(`${this.baseUrl}/tags`);
  }

  patch(id: string, body: TagPatchRequest): Observable<TagView> {
    return this.httpClient.patch<TagView>(`${this.baseUrl}/tags/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/tags/${id}`);
  }
}
