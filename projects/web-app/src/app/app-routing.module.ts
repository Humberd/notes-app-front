import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: 'notes',
    loadChildren: () => import('./views/home/home.module').then(value => value.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/',
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
