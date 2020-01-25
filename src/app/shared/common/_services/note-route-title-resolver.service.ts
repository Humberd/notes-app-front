import { Injectable } from '@angular/core';
import { TitleRouteResolver } from '@ng-boost/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Note } from '../../../domains/note/models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteRouteTitleResolver extends TitleRouteResolver {
  private readonly title$ = new Subject<string>();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    return this.title$.asObservable();
  }

  setTitle(note: Note): void {
    this.title$.next(note.title);
  }

}
