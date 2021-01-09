import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorsService} from './services/error.service';
import {ErrorsHandler} from './hadlers/error.handler';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerErrorsInterceptor} from './interceptors/server-error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ErrorsService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    }
  ]
})
export class ErrorModule { }
