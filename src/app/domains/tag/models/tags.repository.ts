import { TagCreateRequest } from './tag.create-request';
import { Observable } from 'rxjs';
import { Note } from '../../note/models/note';
import { Tag } from './tag.model';
import { TagDeleteRequest } from './tag.delete-request';

export interface TagsRepository {
  create(body: TagCreateRequest): Observable<Note>;

  readList(): Observable<Tag[]>;

  delete(body: TagDeleteRequest): Observable<any>;
}
