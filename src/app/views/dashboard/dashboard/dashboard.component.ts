import { Component, OnInit } from '@angular/core';
import {ToastService} from '../../../@shared/services/toast/toast.service';
import {AuthService} from '../../../@shared/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private toast: ToastService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Show toast message
   * @param mType Message Type success | warning | info | error
   */
  showToast(mType: string): void {
    switch (mType) {
      case 'error':
        this.toast.error('This is example error', 'Error Message');
        return;
      case 'info':
        this.toast.info('This is info message', 'Info message');
        return;
      case 'warning':
        this.toast.warning('This is warning message', 'Warning message');
        return;
      case 'success':
        this.toast.success('This is success message', 'Success message');
        return;
    }
  }

  /**
   * Go to login page
   */
  goToLogin(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']).then();
  }
}
