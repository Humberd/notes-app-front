import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteView } from '@domain/entity/note/view/note-view';
import { CreateNoteRequest } from '@domain/entity/note/request/create-note-request';

@Injectable({
  providedIn: 'root',
})
export class NoteDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  create(body: CreateNoteRequest): Observable<NoteView> {
    return this.httpClient.post<NoteView>(`${this.baseUrl}/notes`, body);
  }

  read(id: string): Observable<NoteView> {
    return this.httpClient.get<NoteView>(`${this.baseUrl}/notes/${id}`);
  }
}
