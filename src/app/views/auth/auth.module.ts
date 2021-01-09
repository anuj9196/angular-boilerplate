import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AuthRouting} from './auth.routing';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorsModule} from '../../@shared/validators/validators.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LockComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRouting,
    RouterModule,
    ReactiveFormsModule,
    ValidatorsModule
  ]
})
export class AuthModule { }
