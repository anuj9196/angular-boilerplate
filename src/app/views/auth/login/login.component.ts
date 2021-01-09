import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../@shared/services/auth/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../@shared/services/toast/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  /**
   * Return form controls
   */
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  /**
   * Send login data to the backend and process login of the user
   */
  login(): void | boolean {

    if (this.submitted || this.form.errors) {
      if (this.submitted) {
        this.toast.warning('Processing previous request', 'Please wait');
      } else {
        this.toast.error('Fix form errors', 'Error');
      }
      return false;
    }

    const data = this.form.value;
    console.log('received data: ', data);

    this.auth.login(data).subscribe(res => {
      console.log('Login response: ', res);
    });
    console.log('authenticated: ', this.auth.isAuthenticated());
    this.router.navigate(['']);
  }

  /**
   * Build login form
   * @private
   */
  private buildLoginForm(): void {
    this.form = this.fb.group({
      login: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      remember_me: [false]
    });
  }
}
