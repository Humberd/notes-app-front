import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateNoteDto, NoteDto } from '../_models/notes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesHttpService {

  constructor(private http: HttpClient) {
  }

  create(body: CreateNoteDto) {
    return this.http.post('http://localhost:8080/notes', body);
  }

  readAll(): Observable<NoteDto[]> {
    return this.http.get<NoteDto[]>('http://localhost:8080/notes');
  }
}
