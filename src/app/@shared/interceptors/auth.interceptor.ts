import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth/auth.service';
import {Observable} from 'rxjs';

/**
 * Implements `HttpInterceptor` to append Authorization header to the request
 *
 * {@example Authorization: Bearer access_token}
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * `AuthInterceptor` constructor
   *
   * @param auth `AuthService` object
   */
  constructor(
    private auth: AuthService
  ) {
  }

  /**
   * Override `intercept()` to add Authorization header to the request.
   *
   * @param request HttpRequest
   * @param next HttpHandler
   *
   * @return HttpHandler handle with updated request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.auth.tokenType} ${this.auth.accessToken}`
      }
    });

    return next.handle(request);
  }
}
