import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from './home.component';
import { allowedNoteTypes, noteTypeParamName } from './services/note-type-route-param';
import { noteIdParamName } from './services/note-id-route-param';
import { NoteRouteTitleResolver } from '../../shared/common/_services/note-route-title-resolver.service';

export const routes: Routes = [
  {
    component: HomeComponent,
    matcher: noteTypeMatcher,
    data: {
      title: NoteRouteTitleResolver,
    },
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

  if (segments.length === 1) {
    return {
      consumed: [noteTypeSegment],
      posParams: {
        [noteTypeParamName]: noteTypeSegment,
      },
    };
  }

  const noteIdSegment = segments[1];

  return {
    consumed: [
      noteTypeSegment,
      noteIdSegment,
    ],
    posParams: {
      [noteTypeParamName]: noteTypeSegment,
      [noteIdParamName]: noteIdSegment,
    },
  };
}
