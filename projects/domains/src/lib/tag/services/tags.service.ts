import { Injectable } from '@angular/core';
import { TagsIndexedDbRepositoryService } from './tags-indexed-db-repository.service';
import { TagCreateRequest } from '../models/tag.create-request';
import { Observable } from 'rxjs';
import { Note } from '../../note/models/note';
import { Tag } from '../models/tag.model';
import { TagDeleteRequest } from '../models/tag.delete-request';
import { TagUpdateRequest } from '../models/tag.update-request';
import { NoteTag } from '../../note/models/note-tag';

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

  watchList(): Observable<Tag[]> {
    return this.repository.watchList();
  }

  update(id: string, body: TagUpdateRequest): Observable<NoteTag> {
    return this.repository.update(id, body);
  }

  delete(body: TagDeleteRequest): Observable<any> {
    return this.repository.delete(body);
  }

  deletePermanently(id: string): Observable<any> {
    return this.repository.deletePermanently(id);
  }
}
