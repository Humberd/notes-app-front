import { Injectable } from '@angular/core';
import { TagDto } from '../_models/tags';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private tags: TagDto[] = [];
  tags$ = new Subject<TagDto[]>();

  private text: string;
  text$ = new Subject<string>();

  addTagToQuery(tag: TagDto) {
    this.tags.push(tag);
    this.tags$.next(this.tags);
  }

  removeTagFromQuery(tag: TagDto) {
    this.tags = this.tags.filter(value => value.id !== tag.id);
    this.tags$.next(this.tags);
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

  updateTextQuery(text) {
    this.text = text;
    this.text$.next(this.text);
  }

}
