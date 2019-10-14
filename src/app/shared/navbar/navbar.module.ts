import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatOptionModule, MatToolbarModule } from '@angular/material';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatOptionModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {
}
