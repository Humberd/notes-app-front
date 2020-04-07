import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authorization',
  },
  {
    path: 'authorization',
    loadChildren: () => import('./views/auth/auth.module').then(value => value.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/',
  }
  // {
  //   path: 'notes',
  //   loadChildren: () => import('./views/notes/notes.module').then(m => m.NotesModule),
  // },
];
