import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewList } from '@domain/common/view-list';
import { WorkspaceView } from '@domain/entity/workspace/view/workspace-view';
import { WorkspaceCreateRequest } from '@domain/entity/workspace/request/workspace-create-request';
import { WorkspacePatchRequest } from '@domain/entity/workspace/request/workspace-patch-request';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceDomainService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  create(body: WorkspaceCreateRequest): Observable<WorkspaceView> {
    return this.httpClient.post<WorkspaceView>(`${this.baseUrl}/workspaces`, body);
  }

  readList(): Observable<ViewList<WorkspaceView>> {
    return this.httpClient.get<ViewList<WorkspaceView>>(`${this.baseUrl}/workspaces`);
  }

  patch(id: string, body: WorkspacePatchRequest): Observable<WorkspaceView> {
    return this.httpClient.patch<WorkspaceView>(`${this.baseUrl}/workspaces/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/workspaces/${id}`);
  }

}
