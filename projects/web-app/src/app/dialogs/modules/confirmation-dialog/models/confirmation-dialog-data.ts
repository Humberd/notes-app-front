import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';

export interface ConfirmationDialogData {
  title: string;
  content: string;
  confirm: {
    name: string,
    color: ThemePalette,
    action: () => Observable<any>
  }
}
