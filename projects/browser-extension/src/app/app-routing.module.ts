import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(value => value.AuthModule),
  },
  {
    path: 'notes',
    loadChildren: () => import('./views/notes/notes.module').then(m => m.NotesModule),
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
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/browser-extension/',
    },
  ],
})
export class AppRoutingModule {
}
