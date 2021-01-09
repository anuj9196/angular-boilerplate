import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

/**
 * Notification service.
 *
 * This works as a middleware between the components, services, etc from where the notification is triggered
 * and the library being used to display the notifications.
 *
 * This services should be used to trigger any notification from anywhere in the application
 * instead of using the library directly.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  /**
   * ToastService constructor
   * @param toastr ToastrService
   */
  constructor(
    private toastr: ToastrService
  ) {}

  /**
   * Called to show success messages.
   * @example
   *     this.toast.success('The action completed', 'Success');
   *
   * @param message Message to show.
   * @param title Title to show.
   * @param config Extra configurations. Only works if the library supports.
   */
  public success(message: string, title?: string, config?: any): void {
    this.toastr.success(message, title, config);
  }

  /**
   * Show error message
   * @example
   *     this.toast.error('The action failed.', 'Error');
   *
   * @param message Message to show.
   * @param title Title to show.
   * @param config Extra configurations. Only works if the library supports.
   */
  public error(message: string, title?: string, config?: any): void {
    this.toastr.error(message, title, config);
  }

  /**
   * Show info message
   * @example
   *     this.toast.info('Info about the action', 'Info');
   *
   * @param message Message to show
   * @param title Title to show
   * @param config Extra configurations. Only works if the library supports.
   */
  public info(message: string, title?: string, config?: any): void {
    this.toastr.info(message, title, config);
  }

  /**
   * Show warning message
   * @example
   *     this.toast.warning('Action may not be executed', 'Warning');
   *
   * @param message Message to show
   * @param title Title to show
   * @param config Extra configurations. Only works if the library supports.
   */
  public warning(message: string, title?: string, config?: any): void {
    this.toastr.warning(message, title, config);
  }
}
