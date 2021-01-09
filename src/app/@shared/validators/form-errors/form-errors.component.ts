import {Component, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective, ValidationErrors} from '@angular/forms';
import {TypeChecking} from '../utils/type-checking';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {

  /**
   * List of validators messages, mapped to the validation type and the error message string.
   */
  private static readonly errorMessages = {
    required: () => 'This field is required',
    minlength: (params: any) => `The min number of characters is ${params.requiredLength}`,
    maxlength: (params: any) => `Maximum ${params.requiredLength} characters allowed`,
    pattern: (params: any) => `The required pattern is: ${params.requiredPattern}`,
    unique: (params: any) => `The value should be unique`,
    years: (params: any) => `${params.message}`,
    email: () => 'Email address is not of a valid format',
    serverError: (params: any) => `${params}`,
    // matchField: (params) => `${params.control2} should match ${params.control1}`,
    matchField: (params: any) => `Entered passwords do not match`,
    invalidUrl: (params: any) => `${params} is not a valid URL`,
    invalidPhoneNo: (params: any) => `This is not a valid Phone No.`,
    invalidEmail: (params: any) => `${params} is not a valid Email.`,
    invalidFax: (params: any) => `${params} is not a valid Fax No.`,
    containsSocialLink: () => `For such URL's create Social Media QR Codes`,
    fileUploadLimit: (params: any) => `Cannot upload more than ${params} files`,
    fieldLimit: (params: any) => `More than ${params} characters are not a allowed`,
    // min: (params: any) => `${params.actual} should be greater than ${params.min}`,
    min: (params: any) => `Should be greater than ${params.min}`,
    max: (params: any) => `Should be less than ${params.max}`,
    socialMediaIds: (params: any) => `Seems that the ${params.charAt(0).toUpperCase() + params.slice(1)} Id you've entered is incorrect`,
    socialMediaHandle: (params: any) => `Seems that the ${params.charAt(0).toUpperCase() + params.slice(1)} handle you've entered is incorrect`,
    socialMediaInks: (params: any) =>  params === 'skype' ? 'Skype URL should be of the format - https://join.skype.com/invite/skype-id' : `Seems that the ${params.charAt(0).toUpperCase() + params.slice(1)} URL you\'ve entered is incorrect`,
    socialMediaPhoneNumbers: (params: any) => `Seems that the ${params.charAt(0).toUpperCase() + params.slice(1)} number you've entered is incorrect`,
    socialMediaCommonError: (params: any) => `Seems that you have entered wrong information`,
    googleAnalyticsId: (params: any) => `${params} is not a valid Google Analytics ID`,
    playStoreLinks: (params: any) => `Please enter a valid URL`,
    invalidNumbers: (params: any) => `Only Numbers are allowed [0-9]`
  };

  /**
   * Input control of type `AbstractControlDirective` and `AbstractControl`.
   */
  @Input()
  public control: AbstractControlDirective | AbstractControl;

  constructor(
    private typeChecking: TypeChecking
  ) { }

  /**
   * Whether to show error messages
   * @return boolean If to show error messages.
   * TODO: this method is called directly in html. Any way to remove from there and fix?
   */
  shouldShowErrors(): boolean {
    return Boolean(this.control && this.control.errors && this.control.touched);
    // return this.control && this.control.errors && (this.control.dirty || this.control.touched ) ;
    // return this.control  && (this.control.dirty || this.control.touched ) ;
  }

  // shouldShowErrors(): AbstractControlDirective | AbstractControl {
  //   return this.control.valueChanges && (this.control.dirty || this.control.touched) && this.control.errors && this.control;
  // }

  /**
   * List of all errors.
   * @return All errors
   */
  listOfErrors(): string[] {
    return (Object as any).keys(this.control.errors).map(
      (field: any) => this.getMessage(field, (this.control.errors as ValidationErrors)[field])
    );
  }

  /**
   * Get message from the list of validators messages
   * @param type Type of validation
   * @param params Extra parameters to pass to the error message.
   */
  private getMessage(type: string, params: any): string {
    /**
     * Check for already registered email, append url
     */
    if (this.typeChecking.isString(params)) {
      if (params.toString().includes('already registered')) {
        // params = params + '<a routerLink="/auth/login">Login Here</a>';
        // params = params + 'Please Login to continue';

        // const frag = document.createRange().createContextualFragment('<div>One</div><div>Two</div>');
        // console.log(frag);
        // document.getElementById('error-links').appendChild(frag);


      }
    }

    // @ts-ignore
    return  FormErrorsComponent.errorMessages[type](params);
  }
}
