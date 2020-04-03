import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {

  constructor(public authorizationHandlerService: AuthorizationHandlerService) {
  }

  ngOnInit(): void {
  }

}
