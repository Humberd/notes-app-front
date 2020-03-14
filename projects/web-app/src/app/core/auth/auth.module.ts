import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtInterceptorService } from './_services/jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
})
export class AuthModule {
}
