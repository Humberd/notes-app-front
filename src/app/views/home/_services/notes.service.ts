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
        content: `# Welcome to Joplin! 🗒️

Joplin is a free, open source note taking and to-do application, which helps you write and organise your notes, and synchronise them between your devices. The notes are searchable, can be copied, tagged and modified either from the applications directly or from your own text editor. The notes are in [Markdown format](https://joplinapp.org/#markdown). Joplin is available as a **💻 desktop**, **📱 mobile** and **🔡 terminal** application.

The notes in this notebook give an overview of what Joplin can do and how to use it. In general, the three applications share roughly the same functionalities; any differences will be clearly indicated.`,
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
