import {Injectable, Injector} from '@angular/core';
import {Event, NavigationError, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ResourceProviderService} from '../../@shared/services/resources/resource-provider.service';
import {HttpErrorResponse} from '@angular/common/http';
// import {LocationStrategy, PathLocationStrategy} from '@angular/common';
// import {HttpErrorResponse} from '@angular/common/http';
// import * as StackTraceParser from 'error-stack-parser';
// import {Observable} from 'rxjs';

/**
 * ErrorsService is used to log the errors and report to
 * the error reporting service
 */
@Injectable()
export class ErrorsService {

  /**
   * Constructor for ErrorsService
   * @param injector To inject services using injector `get()` method
   * @param router To navigate to error pages
   * @param resourceProvider Provides static resource like OAuth2 credentials, endpoints, etc
   */
  constructor(
    private injector: Injector,
    private router: Router,
    private resourceProvider: ResourceProviderService,
  ) {


    /**
     * Subscribe to the NavigationError.
     * This can be used to navigate to the custom url path
     */
    // this.router.events.subscribe(
    //   (event: Event) => {
    //     if (event instanceof NavigationError) {
    //       /**
    //        * Log the error, and send to the reporting server
    //        */
    //       // this.log(event.error).subscribe(
    //       //   (errorWithContext) => {
    //       //     /**
    //       //      * Redirect to the ErrorComponent with error parameters in query
    //       //      */
    //       //     this.router.navigate(['/error'], {queryParams: errorWithContext}).then();
    //       //   }
    //       // );
    //     }
    //   }
    // );
  }

  /**
   * Log the error
   *
   * Add context info to the error before sending to the logging server.
   * @param error Error object
   * @return FakeHttpService
   */
  public log(error: HttpErrorResponse | Error): void {

    /**
     * Log the error to console only when production is not enabled
     */
    if (!environment.production) {
    }

    /**
     * Add additional context to the error
     */
    // const errorToSend = this.addContextInfo(error);

    /**
     * Send error to the service
     *
     * To not use the error reporting, comment out the below code
     * @todo Implement error reporting to the server
     */
    if (environment.production) {
      /**
       * Report error to the error reporting server // sentry, rollbar, etc. here
       */
      // throw error;
    }

    // return FakeHttpService.post(errorToSend);
  }

  /**
   * Add context information to the error
   *
   * @param error Error object
   * @return A dictionary object {name, appId, user, time, id, location, url, status, message, serverResponse, stack}
   */
  // private addContextInfo(error) {
  //
  //   /**
  //    * Name of the error
  //    */
  //   const name = error.name || null;
  //
  //   /**
  //    * App id. Probably the client key assigned to the app.
  //    */
  //   const appId = this.resourceProvider.clientKey;
  //
  //   /**
  //    * @param user User for whom the error occurred.
  //    */
  //   const user = 'fakeUser';
  //
  //   /**
  //    * @param time Time when the error occurred.
  //    */
  //   const time = new Date().getTime();
  //
  //   /**
  //    * @param id Unique id generated using the `appId`, `user` and `time`.
  //    */
  //   const id = `${appId}-${user}-${time}`;
  //
  //   /**
  //    * @param location Location of the error.
  //    */
  //   const location = this.injector.get(LocationStrategy);
  //
  //   /**
  //    * @param url URL of the error if location is an instance of `PathLocationStrategy`
  //    */
  //   const url = location instanceof  PathLocationStrategy ? location.path() : '';
  //
  //   /**
  //    * @param status Status of the error. Probably the error code.
  //    */
  //   const status = error.status || null;
  //
  //   /**
  //    * @param message Error message
  //    */
  //   const message = error.message || error.toString();
  //
  //   /**
  //    * @param serverResponse Server response
  //    */
  //   const serverResponse = error.error || null;
  //
  //   /**
  //    * @param stack Stack trace of the error.
  //    */
  //   const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);
  //
  //   return {name, appId, user, time, id, location, url, status, message, serverResponse, stack};
  // }

}

/**
 * FakeHttpService returns new Observable of the error.
 */
// class FakeHttpService {
//   static post(error): Observable<any> {
//     return new Observable(error);
//   }
// }
