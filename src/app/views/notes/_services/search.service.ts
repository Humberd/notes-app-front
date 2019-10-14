import { Injectable } from '@angular/core';
import { TagDto } from '../_models/tags';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  tags$ = new BehaviorSubject<TagDto[]>([]);
  text$ = new BehaviorSubject<string>('');

  addTagToQuery(tag: TagDto) {
    this.tags$.next([...this.tags$.value, tag]);
  }

  removeTagFromQuery(tag: TagDto) {
    this.tags$.next(this.tags$.value.filter(
      value => value.id !== tag.id));
  }

  isTagInQuery(tag: TagDto): boolean {
    return !!this.tags$.value.find(
      value => value.id === tag.id);
  }

  toggleTagInQuery(tag: TagDto) {
    if (this.isTagInQuery(tag)) {
      this.removeTagFromQuery(tag);
    } else {
      this.addTagToQuery(tag);
    }
  }

  updateTextQuery(text) {
    this.text$.next(text);
  }

}
