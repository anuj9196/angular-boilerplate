import { Injectable } from '@angular/core';
import {AppHttpClient} from '../../client/app-http.client';
import {Observable} from 'rxjs';
import {AuthLoginPayloadModel} from '../../models/auth/auth-login-payload.model';
import {AuthLoginResponseModel} from '../../models/auth/auth-login-response.model';
import {AuthRegisterPayloadModel} from '../../models/auth/auth-register-payload.model';
import {AuthRegisterResponseModel} from '../../models/auth/auth-register-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private 'endpoint' = 'auth/';

  private loggedIn = false;

  constructor(
    private appHttp: AppHttpClient
  ) { }

  /**
   * Return boolean when user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.loggedIn;
  }

  /**
   * Return status of the locked screen
   */
  public isLocked(): boolean {
    return false;
  }

  /**
   * Return token type
   */
  public get tokenType(): string {
    return 'Bearer';
  }

  /**
   * Return access token
   */
  public get accessToken(): string {
    return 'access-token';
  }

  /**
   * Login
   */
  public login(data: AuthLoginPayloadModel): Observable<AuthLoginResponseModel> {
    this.loggedIn = true;
    const url = `${this.endpoint}login`;
    return this.appHttp.Post(url, data);
  }

  /**
   * Logout user
   */
  logout(): Promise<any> {
    this.loggedIn = false;
    const url = `${this.endpoint}logout/`;

    return new Promise(((resolve, reject) => {
      this.appHttp.Delete(url).subscribe(() => {
        resolve();
      });
    }));
  }

  /**
   * Register new user
   * @param data Registration payload
   */
  register(data: AuthRegisterPayloadModel): Observable<AuthRegisterResponseModel> {
    const url = `${this.endpoint}register/`;

    return this.appHttp.Post(url, data);
  }
}
