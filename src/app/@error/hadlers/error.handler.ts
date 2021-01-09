import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastService} from '../../@shared/services/toast/toast.service';
import {AuthService} from '../../@shared/services/auth/auth.service';
import {ErrorsService} from '../services/error.service';

/**
 * Format json error object in string.
 * @param error Formatted string error
 */
function formatToString(error: any): string {
  let messageString = '';

  if (Array.isArray(error)) {
    for (const e of error) {
      if (typeof e === 'object') {
        for (const k in e) {
          if (e.hasOwnProperty(k)) {
            messageString += k + ': ';

            if (Array.isArray(e[k])) {
              messageString += e[k];
            } else if (typeof e[k] === 'string') {
              messageString += e[k];
            } else {
              messageString += `${e[k]}`;
            }
          }
        }
      }
    }
  } else {

    /**
     * Iterate over json object
     */
    for (const key in error) {
      /**
       * If key is the own property of the error
       */
      if (error.hasOwnProperty(key)) {
        /**
         * Append key to the messageString
         */
        // messageString += key + ': ';

        /**
         * If value is of array type
         */
        if (error[key] instanceof Array) {
          /**
           * Iterate over the array value
           */
          for (const eMessage in error[key]) {
            if (error[key].hasOwnProperty(eMessage)) {
              /**
               * If eMessage is not blank
               */
              if (eMessage !== '') {
                /**
                 * Append error message with key passed to error[key]
                 */
                messageString += error[key][eMessage] + ' ';
              }
            }
          }
        } else {
          /**
           * If not an array, append the value
           */
          messageString += error[key] + ' ';
        }

        /**
         * Append new line for adding next key
         */
        messageString += '<br>';
      }
    }
  }

  return messageString;
}

/**
 * ErrorsHandler class implements `ErrorHandler` interface.
 *
 * This is meant for handling all types of errors occurring in the application.
 * The proper action is taken depending on the type of error occurred.
 * The actions involves logging of the error as well as notifying the user
 * about the error with proper error message.
 *
 * Also redirect user to the required path in case of authentication and other errors.
 */
@Injectable()
export class ErrorsHandler implements ErrorHandler {

  /**
   * ErrorsHandler constructor
   * @param injector Injector
   */
  constructor(
    private injector: Injector) {
  }

  /**
   * Handle the error thrown by the application
   * and take appropriate action depending on the type of error
   * @param error The error object thrown in case of error
   */
  handleError(error: Error | HttpErrorResponse): any {

    /**
     * @param notificationService ToastService
     */
    const toastService = this.injector.get(ToastService);

    /**
     * @param errorsService ErrorsService
     */
    const errorsService = this.injector.get(ErrorsService);

    /**
     * Inject auth service
     */
    const authService = this.injector.get(AuthService);

    /**
     * @param router Router
     */
    const router = this.injector.get(Router);

    /**
     * IF error is of HttpErrorResponse instance,
     * it is HTTP Error (Server or Connection error), may caused by
     * 1. Network disconnected - Application is in offline mode
     * 2. HTTP Error response other than 200 @example 404, 403, etc
     */
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        /**
         * Handle offline error
         */
        toastService.error(
          'Could not connect to the network',
          'Connection lost'
        );
      } else {
        /**
         * Handle HTTP Error
         */

        /**
         * User not authenticated, redirect to login page
         */
        if (error.status === 401) {
          if (authService.isAuthenticated()) {
            return authService.logout().then(() => {
              router.navigate(['/auth/login']).then();
            });
          } else {
            return false;
          }
        }
        // if (error.status === 403 || error.status === 401) {
        //   router.navigate(['/auth/logout']).then();
        // }

        /**
         * Prepare error message
         */
        let message = '';
        if (error.status === 400) {
          if (error.status !== null) {
            message = formatToString(error.error);
          }
        } else if (error.status === 404) {
          /**
           * Resource not available
           */
          message = 'Request resource does not exists.';
        } else if (error.status === 403) {
          if (error.error && typeof error.error === 'object') {
            if (error.error.hasOwnProperty('detail')) {
              message = error.error.detail;
            }
          } else if (error.error && typeof error.error === 'string') {
            message = error.error;
          } else {
            message = 'Authorization failed for the resource.';
          }
        } else if (error.status === 429) {
          message = error.error.message + '. Available in ' + error.error.available_in_sec + ' seconds';
        } else {
          /**
           * Handle other types of errors
           */
          message = `${error.status} - ${error.message}`;
        }

        /**
         * Show notification to the user
         */
        toastService.error(
          message,
          'Error'
        );

        /**
         * Report error to the error service and send to the reporting server
         */
        errorsService.log(error);
      }
    } else {

      /**
       * Client error happened
       * Send the error to the server and then
       * redirect the user to tht page with all the info
       */
      errorsService.log(error);
    }
  }
}
