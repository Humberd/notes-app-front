import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routes';
import { AuthDialogsModule } from './_dialogs/auth-dialogs.module';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthDialogsModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule {
}
