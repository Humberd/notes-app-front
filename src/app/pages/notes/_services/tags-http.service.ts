import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagDto } from '../_models/tags';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsHttpService {

  constructor(private http: HttpClient) {
  }

  readAll(): Observable<TagDto[]> {
    return this.http.get<TagDto[]>(`${environment.serverApi}/tags`);
  }
}
