import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserView } from '../view/user-view';
import { ViewList } from '@domain/common/view-list';
import { NoteView } from '../../note/view/note-view';
import { ReadNotesListRequest } from '@domain/entity/note/request/read-notes-list-request';
import { PageableRequest } from '@domain/common/pageable-request';

@Injectable({
  providedIn: 'root',
})
export class MyDataDomainService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
  }

  readMyProfile(jwt: string): Observable<UserView> {
    return this.httpClient.get<UserView>(`${this.baseUrl}/my/profile`, {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
  }

  readMyNotesList(params?: ReadNotesListRequest): Observable<ViewList<NoteView>> {
    return this.httpClient.get<ViewList<NoteView>>(`${this.baseUrl}/my/notes`,{
      params: PageableRequest.stringify(params)
    });
  }
}
