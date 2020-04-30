import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserView } from '../view/user-view';
import { ViewList } from '@domain/common/view-list';
import { NoteView } from '../../note/view/note-view';
import { NotesListFilterRequest } from '@domain/entity/note/request/notes-list-filter-request';
import { PageableRequest } from '@domain/common/pageable-request';

@Injectable({
  providedIn: 'root',
})
export class UserDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  read(usedId: string,jwt: string): Observable<UserView> {
    return this.httpClient.get<UserView>(`${this.baseUrl}/users/${usedId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
  }
}
