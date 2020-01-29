import { Injectable } from '@angular/core';
import { IndexedDbLayerService } from '../../../../../../src/app/core/data-access-layers/indexed-db/indexed-db.layer.service';
import { TagCreateRequest } from '../models/tag.create-request';
import { Observable } from 'rxjs';
import { Note } from '../../note/models/note';
import { TagDeleteRequest } from '../models/tag.delete-request';
import { Tag } from '../models/tag.model';
import { TagsRepository } from '../models/tags.repository';
import { TagUpdateRequest } from '../models/tag.update-request';
import { NoteTag } from '../../note/models/note-tag';

@Injectable({
  providedIn: 'root',
})
export class TagsIndexedDbRepositoryService implements TagsRepository {

  constructor(private indexedDbLayer: IndexedDbLayerService) {
  }

  create(body: TagCreateRequest): Observable<Note> {
    return this.indexedDbLayer.addTag(body.noteId, body.name);
  }

  update(id: string, body: TagUpdateRequest): Observable<NoteTag> {
    return this.indexedDbLayer.updateTag(id, body.name, body.colorHex);
  }

  readList(): Observable<Tag[]> {
    return this.indexedDbLayer.readTagsList();
  }

  watchList(): Observable<Tag[]> {
    return this.indexedDbLayer.watchTagsList();
  }

  delete(body: TagDeleteRequest): Observable<any> {
    return this.indexedDbLayer.removeTag(body.noteId, body.tagId);
  }

  deletePermanently(id: string): Observable<any> {
    return this.indexedDbLayer.removeTagPermanently(id);
  }

}
