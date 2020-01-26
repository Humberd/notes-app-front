import { TagCreateRequest } from './tag.create-request';
import { Observable } from 'rxjs';
import { Note } from '../../note/models/note';
import { Tag } from './tag.model';
import { TagDeleteRequest } from './tag.delete-request';
import { TagUpdateRequest } from './tag.update-request';
import { NoteTag } from '../../note/models/note-tag';

export interface TagsRepository {
  create(body: TagCreateRequest): Observable<Note>;

  update(id: string, body: TagUpdateRequest): Observable<NoteTag>;

  readList(): Observable<Tag[]>;

  watchList(): Observable<Tag[]>;

  delete(body: TagDeleteRequest): Observable<any>;

  deletePermanently(id: string): Observable<any>;
}
