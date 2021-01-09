import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthLayoutComponent} from './auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('../../../views/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthLayoutRouting {}
