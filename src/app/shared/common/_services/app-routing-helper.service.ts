import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NoteType } from '../../../views/home/_services/note-type-route-param';

@Injectable({
  providedIn: 'root',
})
export class AppRoutingHelperService {

  constructor(private router: Router) {
  }

  replaceNoteTypeInPath(newNoteType: NoteType, currentNoteType: NoteType): string {
    const urlSegments = this.router.url.split('/');
    const noteTypeIndex = urlSegments.findIndex(value => value === currentNoteType);
    if (noteTypeIndex < 0) {
      return `../${newNoteType}`;
    }

    urlSegments[noteTypeIndex] = newNoteType;
    return urlSegments.join('/').split('?')[0];
  }

  replaceNoteIdInPath(noteId: string): string {
    const urlSegments = this.router.url.split('/').filter(Boolean);

    if (urlSegments.length <= 1) {
      return this.router.url;
    }

    urlSegments[2] = noteId;

    return '/' + urlSegments.join('/').split('?')[0];
  }
}
