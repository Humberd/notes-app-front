import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-workspace-modification-dialog',
  templateUrl: './workspace-modification-dialog.component.html',
  styleUrls: ['./workspace-modification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceModificationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
