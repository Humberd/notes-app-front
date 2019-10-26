import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from './home.component';
import { allowedNoteTypes, noteTypeParamName } from './_services/note-type-route-param';
import { NoteContainerEmptyComponent } from './note-container-empty/note-container-empty.component';
import { noteIdParamName } from './_services/note-id-route-param';

export const routes: Routes = [
  {
    component: HomeComponent,
    matcher: noteTypeMatcher,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NoteContainerEmptyComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'all',
  },
];

/**
 * /:noteType/:noteId
 *
 * :noteType param only to be one of [allowedNoteTypes]
 * :noteId param is whatever
 */
export function noteTypeMatcher(segments: UrlSegment[]): UrlMatchResult {
  if (segments.length === 0) {
    return null;
  }

  const noteTypeSegment = segments[0];
  if (!allowedNoteTypes.includes(noteTypeSegment.path as any)) {
    return null;
  }

  const matchResult = {
    consumed: [noteTypeSegment],
    posParams: {
      [noteTypeParamName]: noteTypeSegment,
    },
  };

  if (segments.length === 1) {
    console.log('segment is 1', matchResult);
    return matchResult;
  }

  const noteIdSegment = segments[1];

  matchResult.consumed.push(noteIdSegment);
  matchResult.posParams[noteIdParamName] = noteIdSegment;

  return matchResult;
}
