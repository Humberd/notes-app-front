import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ResizableModule } from 'angular-resizable-element';
import { GeneralListComponent } from './general-list/general-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';
import { GeneralPillComponent } from './general-list/general-pill/general-pill.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResizableModule,
    TranslateModule,
    MatIconModule,
  ],
  declarations: [
    HomeComponent,
    GeneralListComponent,
    GeneralPillComponent,
  ],
})
export class HomeModule {
}
