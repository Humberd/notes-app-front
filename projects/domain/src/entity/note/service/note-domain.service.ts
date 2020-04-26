import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteView } from '@domain/entity/note/view/note-view';
import { NoteCreateRequest } from '@domain/entity/note/request/note-create-request';
import { NotePatchRequest } from '@domain/entity/note/request/note-patch-request';

@Injectable({
  providedIn: 'root',
})
export class NoteDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  create(body: NoteCreateRequest): Observable<NoteView> {
    return this.httpClient.post<NoteView>(`${this.baseUrl}/notes`, body);
  }

  patch(id: string, body: NotePatchRequest): Observable<NoteView> {
    return this.httpClient.patch<NoteView>(`${this.baseUrl}/notes/${id}`, body);
  }

  read(id: string): Observable<NoteView> {
    return this.httpClient.get<NoteView>(`${this.baseUrl}/notes/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/notes/${id}`);
  }
}
