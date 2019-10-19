import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NoteContainerComponent } from './note-container/note-container.component';
import { allowedNoteTypes, noteTypeParamName } from './_services/note-type-route-param';
import { NoteContainerEmptyComponent } from './note-container-empty/note-container-empty.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    matcher: noteTypeMatcher(),
    children: [
      {
        path: ':noteId',
        component: NoteContainerComponent,
      },
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
 * Allows :noteType param to be one of [allowedNoteTypes]
 */
function noteTypeMatcher() {
  return segments => {
    if (segments.length === 0) {
      return null;
    }

    const noteTypeSegment = segments[0];
    if (!allowedNoteTypes.includes(noteTypeSegment.path as any)) {
      return null;
    }

    return {
      consumed: [noteTypeSegment],
      posParams: {
        [noteTypeParamName]: noteTypeSegment,
      },
    };
  };
}
