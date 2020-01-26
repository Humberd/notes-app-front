import { ThemePalette } from '@angular/material/core';

export interface ConfirmationDialogData {
  title: string;
  content: string;
  actionButton: string;
  actionButtonColor: ThemePalette;
}
