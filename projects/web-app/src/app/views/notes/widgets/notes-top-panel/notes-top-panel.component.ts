import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthorizationHandlerService } from '@web-app/app/utils/auth/authorization-handler.service';

@Component({
  selector: 'app-notes-top-panel',
  templateUrl: './notes-top-panel.component.html',
  styleUrls: ['./notes-top-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'navigation'
  }
})
export class NotesTopPanelComponent implements OnInit {

  constructor(public authorizationHandlerService: AuthorizationHandlerService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authorizationHandlerService.logout();
  }
}
