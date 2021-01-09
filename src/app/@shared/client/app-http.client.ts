import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResourceProviderService} from '../services/resources/resource-provider.service';

/**
 * Request options interface
 * @param headers HttpHeaders
 * @param observe 'body'
 * @param params HttpParams
 * @param reportProgress boolean
 * @param responseType 'json'
 * @param withCredentials boolean
 * @param body any
 */
export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

/**
 * Method to be called to initialize the class
 * @param http HttpClient
 * @param resource ResourceProviderService
 */
export function appHttpClientCreator(http: HttpClient, resource: ResourceProviderService): AppHttpClient {
  return new AppHttpClient(http, resource);
}

/**
 * Class to provide extended Angular default HttpClient request methods.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AppHttpClient {

  /**
   * @param apiUrl API URL to use. Get it from the static resource provider
   */
  private apiUrl = this.resource.url;

  /**
   * Extending the HttpClient through the Angular DI
   * @param http HttpClient object
   * @param resource ResourceProviderService object
   */
  constructor(
    public http: HttpClient,
    private resource: ResourceProviderService
  ) {}

  /**
   * GET request
   *
   * @param endpoint It doesn't need `/` in the front of the endpoint
   * @param options Options of the request like headers, body, etc.
   */
  public Get<T>(endpoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.apiUrl + endpoint, options);
  }

  /**
   * POST request
   *
   * @param endpoint Endpoint of the API
   * @param params Body of the request
   * @param options Options of the request like headers, body, etc.
   */
  public Post<T>(endpoint: string, params: object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(this.apiUrl + endpoint, params, options);
  }

  /**
   * PUT request
   *
   * @param endpoint Endpoint of the API
   * @param params Body of the request
   * @param options Options of the request like headers, body, etc.
   */
  public Put<T>(endpoint: string, params: object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(this.apiUrl + endpoint, params, options);
  }

  /**
   * PATCH request
   *
   * @param endpoint Endpoint of the API
   * @param params Body of the request
   * @param options Options of the request like headers, body, etc.
   */
  public Patch<T>(endpoint: string, params: object, options?: IRequestOptions): Observable<T> {
    return this.http.patch<T>(this.apiUrl + endpoint, params, options);
  }

  /**
   * DELETE request
   *
   * @param endpoint Endpoint of the API
   * @param options Options of the request like headers, body, etc.
   */
  public Delete<T>(endpoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.apiUrl + endpoint, options);
  }
}
