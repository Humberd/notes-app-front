import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../../../models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  // tslint:disable-next-line:variable-name
  private readonly _notes$ = new BehaviorSubject<Note[]>([]);
  readonly notes$ = this._notes$.asObservable();

  constructor() {
    this._notes$.next([
      {
        id: '1',
        title: 'Welcome to BoostNote!',
        content: 'Something',
        tags: [
          {
            name: 'test',
            color: 'purple',
          },
          {
            name: 'gibraltar',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Snippet note example',
        content: 'Something else',
        tags: [
          {
            name: 'gibraltar',
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Foobar',
        content: 'Something else',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
