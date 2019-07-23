import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagDto } from '../_models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {
  }

  readAll(): Observable<TagDto[]> {
    return this.http.get<TagDto[]>('http://localhost:8080/tags');
  }
}
