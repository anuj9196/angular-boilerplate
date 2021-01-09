import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import {DashboardLayoutRouting} from './dashboard-layout.routing';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardLayoutRouting,
    RouterModule
  ]
})
export class DashboardLayoutModule { }
