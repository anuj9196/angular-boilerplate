# AngularBoilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Pull code

Clone the project or download and extract the source code.

## Install dependencies

The project is equipped with the following dependencies

* toastr -- Show toast messages

Install the dependencies by running

```
npm install
```

### Suggested dependencies

* ng-bootstrap: For bootstrap
* fontawesome: For icons

## Configuration

* **AppHttpClient**: Customised HttpClient to add extra headers and API host. File is located in `@shared/client/app-http.client.ts`.
  To use, import the client and send the data to the endpoint.
  ```
  const url = `auth/login`;
  this.appHttpClient.Post(url, data);
  ```
  Provides following methods
  * Post
  * Get
  * Patch
  * Put
  * Delete
  Returns Observable
    
* **ResourcesService**: Serves the default resources like, apiURL, client key, client secret.
  Set the environment variable for the apiUrl. The apiUrl should end with `/`;
  This URL is by default appended to all the API calls using `AppHttpClient`.
  
* **AuthInterceptor**: It appends the access token, token type to the request authorization header for every request.

* **ToastService**: It extends the `toastr` library to centralize toast messages.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
