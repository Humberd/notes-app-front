import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NoteContainerComponent } from './note-container/note-container.component';
import { allowedNoteTypes, noteTypeParamName } from './_services/note-type-route-param';

export const routes: Routes = [
  {
    component: HomeComponent,
    matcher: segments => {
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

    },
    children: [
      {
        path: ':noteId',
        component: NoteContainerComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'all',
  },
];
