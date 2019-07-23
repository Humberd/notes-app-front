import { Injectable } from '@angular/core';
import { TagDto } from '../_models/tags';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private tags: TagDto[] = [];


  constructor() {
  }

  addTagToQuery(tag: TagDto) {
    this.tags.push(tag);
  }

  removeTagFromQuery(tag: TagDto) {
    this.tags = this.tags.filter(value => value.id !== tag.id);
  }

  isTagInQuery(tag: TagDto): boolean {
    return !!this.tags.find(value => value.id === tag.id);
  }

  toggleTagInQuery(tag: TagDto) {
    if (this.isTagInQuery(tag)) {
      this.removeTagFromQuery(tag);
    } else {
      this.addTagToQuery(tag);
    }
  }

}
