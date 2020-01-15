import { Injectable } from '@angular/core';
import { IndexedDbLayer } from '../../../core/data-access-layers/indexed-db/indexed-db.layer';
import { TagCreateRequest } from '../models/tag.create-request';
import { Observable } from 'rxjs';
import { Note } from '../../note/models/note';
import { TagDeleteRequest } from '../models/tag.delete-request';
import { Tag } from '../models/tag.model';
import { TagsRepository } from '../models/tags.repository';

@Injectable({
  providedIn: 'root',
})
export class TagsIndexedDbRepositoryService implements TagsRepository {

  constructor(private indexedDbLayer: IndexedDbLayer) {
  }

  create(body: TagCreateRequest): Observable<Note> {
    return this.indexedDbLayer.addTag(body.noteId, body.name);
  }

  readList(): Observable<Tag[]> {
    return this.indexedDbLayer.readTagsList();
  }

  delete(body: TagDeleteRequest): Observable<any> {
    return this.indexedDbLayer.removeTag(body.noteId, body.name);
  }

}
