import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {retry} from 'rxjs/operators';
import {Observable} from 'rxjs';

/**
 * Interceptor for server errors.
 * This interceptor can be used to configure retry attempts in case
 * of a server error.
 *
 * This class meant to intercept the error and retry
 * up to specified number of attempts before throwing
 * any error that will be handled further by the
 * Error handler and Error services.
 */
@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  /**
   * @param retryNTimes Number of times to retry before raising an error. Set 0 for no retries.
   */
  private retryNTimes = 0;

  /**
   * ServerErrorsInterceptor constructor
   */
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(this.retryNTimes)
    );
  }
}
