import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(value => value.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    onSameUrlNavigation: 'reload',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'corrected',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
