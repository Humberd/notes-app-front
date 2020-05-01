import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtensionLoginComponent } from './extension-login.component';
import { RouterModule } from '@angular/router';
import { routes } from '@web-app/app/views/extension-login/extension-login.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExtensionLoginComponent]
})
export class ExtensionLoginModule { }
