import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateNoteDto, NoteDto } from '../_models/notes';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesHttpService {

  constructor(private http: HttpClient) {
  }

  create(body: CreateNoteDto) {
    return this.http.post(`${environment.serverApi}/notes`, body);
  }

  update(
    id: number,
    body: CreateNoteDto,
  ) {
    return this.http.put(`${environment.serverApi}/notes/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete(`${environment.serverApi}/notes/${id}`);
  }

  readAll(
    tags: string[],
    query: string,
  ): Observable<NoteDto[]> {
    return this.http.get<NoteDto[]>(`${environment.serverApi}/notes`, {
      params: {
        tags, query,
      },
    });
  }
}
