import { Injectable } from '@angular/core';
import { TagsIndexedDbRepositoryService } from './tags-indexed-db-repository.service';
import { TagCreateRequest } from '../models/tag.create-request';
import { Observable } from 'rxjs';
import { Note } from '../../note/models/note';
import { Tag } from '../models/tag.model';
import { TagDeleteRequest } from '../models/tag.delete-request';

@Injectable({
  providedIn: 'root',
})
export class TagsService {

  constructor(private repository: TagsIndexedDbRepositoryService) {
  }

  create(body: TagCreateRequest): Observable<Note> {
    return this.repository.create(body);
  }

  readList(): Observable<Tag[]> {
    return this.repository.readList();
  }

  delete(body: TagDeleteRequest): Observable<any> {
    return this.repository.delete(body);
  }
}
