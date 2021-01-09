import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    loadChildren: () => import('../../../views/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardLayoutRouting {}
