import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './@shared/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./@shared/layout/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  },
  {
    path: '',
    loadChildren: () => import('./@shared/layout/dashboard-layout/dashboard-layout.module').then(m => m.DashboardLayoutModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
