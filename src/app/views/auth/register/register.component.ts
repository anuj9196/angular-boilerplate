import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../@shared/services/auth/auth.service';
import {ToastService} from '../../../@shared/services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.buildRegisterForm();
  }

  register(): void | boolean {
    if (this.submitted || this.form.errors) {
      if (this.submitted) {
        this.toast.warning('Processing previous request', 'Please wait');
      } else {
        this.toast.error('Fix form errors', 'Errors');
      }

      return false;
    }

    const data = this.form.value;

    this.authService.register(data).subscribe(res => {
      console.log('Registration response: ', res);
    });
  }

  /**
   * Build register form
   * @private
   */
  private buildRegisterForm(): void {
    this.form = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }
}
