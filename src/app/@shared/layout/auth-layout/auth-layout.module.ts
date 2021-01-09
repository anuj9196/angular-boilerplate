import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthLayoutRouting} from './auth-layout.routing';
import {AuthLayoutComponent} from './auth-layout.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRouting,
    RouterModule
  ]
})
export class AuthLayoutModule { }
