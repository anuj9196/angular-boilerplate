import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {StringFormatter} from './string-formatter';

/**
 * Provides custom validation methods used for form validation.
 */
export class CustomValidator {
  /**
   * @description
   * Provides custom validation based on on the fields
   */

  /**
   * Check for two field controls match.
   * Will raise matchField error when two fields does not match.
   *
   * The error messages will be displayed under secondary control.
   *
   * @param control1 Primary field control
   * @param control2 Secondary field control
   */
  static matchField(control1: string, control2: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[control1];
      const secondControl = formGroup.controls[control2];

      // return null if controls haven't initialized yet
      if (!firstControl || !secondControl || !firstControl.value || !secondControl.value) {
        return null;
      }

      // Check for existing error
      if (secondControl.errors && !secondControl.errors.matchField) {
        return null;
      }

      // Check for match
      if (firstControl.value !== secondControl.value) {
        secondControl.setErrors({
          matchField: {
            control1: new StringFormatter(control1).splitToTitleCase('_'),
            control2: new StringFormatter(control2).splitToTitleCase('_')
          }
        });
      } else {
        secondControl.setErrors(null);
      }

      return null;
    };
  }

  /**
   * Validate for the valid URL based on the regular expression.
   * @param control AbstractControl
   */
  static urlField(control: AbstractControl): ValidationErrors | null {

    // Old Regex > Do not remove
    const regex = new RegExp('(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.][a-z0-9]+)*\\.[a-z]{2,10}(:[0-9]{1,5})?(\\/.*)?$');

    /**
     * Check for regular expresion only if control has value.
     * If regular expression check failed, return invalidUrl with the control value.
     */
    if (control.value && !regex.test(control.value)) {
      return {
        invalidUrl: control.value
      };
    }

    /**
     * Return null if control has errors but have error other than invalidUrl
     */
    if (control.errors && !control.errors.invalidUrl) {
      return null;
    }

    return null;
  }

  /**
   * Validate for the valid URL based on the regular expression.
   * Validates simple URL of the format abc.com
   * @param control AbstractControl
   */
  static simpleUrlField(control: AbstractControl): ValidationErrors | null {

    // Old Regex > Do not remove
    const regex = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]+$');
    /**
     * Check for regular expresion only if control has value.
     * If regular expression check failed, return invalidUrl with the control value.
     */
    if (control.value && !regex.test(control.value)) {
      return {
        invalidUrl: control.value
      };
    }

    /**
     * Return null if control has errors but have error other than invalidUrl
     */
    if (control.errors && !control.errors.invalidUrl) {
      return null;
    }

    return null;
  }


  /**
   * Validate for the valid URL based on the regEx and also checks if the link
   * contains any social media tags like 'facebook.com, twitter.com  etc'
   * @param control AbstractControl
   */
  static isSocialLinksPresent(control: AbstractControl): ValidationErrors | null {

    const socialNetworks = [
      {
        title: 'Facebook',
        checkUrl: ['facebook', 'fb', 'mbasic.facebook', 'm.facebook']
      },
      {
        title: 'Youtube',
        checkUrl: ['youtube', 'm.youtube', 'youtu.be']
      },
      {
        title: 'Twitter',
        checkUrl: ['twitter', 'twitter.com']
      },
      {
        title: 'LinkedIn',
        checkUrl: ['linkedin', 'linkedin.com']
      },
      {
        title: 'Pinterest',
        checkUrl: ['pinterest']
      },
      {
        title: 'Instagram',
        checkUrl: ['instagram']
      },
      {
        title: 'WeChat',
        checkUrl: ['wechat']
      },
      {
        title: 'Whatsaap',
        checkUrl: ['whatsaap']
      },
      {
        title: 'Tumblr',
        checkUrl: ['tumblr']
      },
      {
        title: 'Quora',
        checkUrl: ['quora']
      },
      {
        title: 'Reddit',
        checkUrl: ['reddit']
      },
      {
        title: 'Meetup',
        checkUrl: ['meetup']
      },
      {
        title: 'QQSocial',
        checkUrl: ['qqsocial']
      }
    ];

    /*
    *  socialLinkPresent captures the object title that is present in the Link
    */
    let socialLinkPresent: any;
    socialLinkPresent = {};

    let isSocialLinkPresent = false;

    /*
    * Loop search for social media tag present in the Url i.e control.value
    * */
    for (const key in socialNetworks) {
      if (socialNetworks.hasOwnProperty(key)) {
        for (const entry of socialNetworks[key].checkUrl) {
          if (control.value.includes(entry)) {
            isSocialLinkPresent = true;
            socialLinkPresent.title = socialNetworks[key].title;
          } else {

          }
        }
      }
    }

    /**
     * Return null if control has errors but have error other than invalidUrl
     */
    if (control.errors && !control.errors.containsSocialLink) {
      return null;
    }

    /**
     * Check if control.value is present and any SocailMedia tag is present in the URL
     */
    if (control.value && isSocialLinkPresent) {
      return {
        containsSocialLink: control.value
      };
    }


    return null;
  }

  /**
   * Validations used for checking the limit of string that contains HTML tags (mainly from editor components)
   * and return err when limit is exceeded.
   * @param control: AbstractControl
   */
  static htmlStringCheck(control: AbstractControl): ValidationErrors | null {

    // Removed HTML tags from string.
    const regEx = /(<([^>]+)>)/ig;
    const str = control.value.replace(regEx, '');
    const count = str.toString().length;

    /**
     * Return null if control has errors but have error other than invalidUrl
     */
    if (control.errors && !control.errors.invalidUrl) {
      return null;
    }
    //
    // /**
    //  * Check if the count of string excluding html tags exceeds the limit i.e here 30
    //  */
    if (control.value && count > 30) {
      // control.setValue('abcd');
      return {
        fieldLimit: 30
      };
    }

    return null;
  }

  /**
   * Validate string limit for HTML contain string.
   * The size limit is validated by stripping the HTML from the string and then getting the count.
   *
   * @param limit Limit of the string. Default to 1
   * @param sliceLength Whether to slice the length of the string. If true, the control value will be set by
   *  slicing extra words
   */
  static htmlStringCustomLimit(limit = 1, sliceLength = false): ValidatorFn | null {
    return (control: AbstractControl) => {

      // Removed HTML tags from string.
      const regEx = /(<([^>]+)>)/ig;
      const str = control.value.replace(regEx, '');
      const count = str.toString().length;

      /**
       * Return null if control has errors but have error other than invalidUrl
       */
      if (control.errors) {
        return null;
      }

      /**
       * Check if the count of string excluding html tags exceeds the limit i.e here 30
       */
      if (control.value && count > limit) {
        const newVal = str.substring(0 , (limit - 1));
        control.setValue(newVal);
        return {
          fieldLimit: limit
        };
      }

      return null;

    };
  }


  /**
   *  Validate Fax number
   * @param control: AbstractControl
   */
  static faxNumber(control: AbstractControl): ValidationErrors | null {

    const regex = new RegExp('^((\\+\\d{1,3}([- ])?\\(?\\d\\)?([- ])?\\d{1,5})|(\\(?\\d{2,6}\\)?))([- ])?(\\d{3,4})([- ])?(\\d{4})(( x| ext)\\d{1,5})?$');

    /**
     * Return null if control has errors but have error other than invalidUrl
     */
    if (control.errors && !control.errors.invalidFax) {
      return null;
    }

    /**
     * Check for regular expresion only if control has value.
     * If regular expression check failed, return invalidFax with the control value.
     */
    if (control.value && !regex.test(control.value.trim())) {
      return {
        invalidFax: control.value
      };
    }

    return null;
  }

  /**
   *  Validate Phone Number
   * @param control: AbstractControl
   */
  static phoneNumber(control: AbstractControl): ValidationErrors | null {

    const regex = new RegExp('^(\\d{1,20})$|^((\\+\\d{1,3}([- ])?\\(?\\d\\)?([- ])?\\d{1,5})|(\\(?\\d{2,6}\\)?))([- ])?(\\d{3,4})([- ])?(\\d{4})(( x| ext)\\d{1,5})?$');

    /**
     * Check for regular expresion only if control has value.
     * If regular expression check failed, return invalidPhoneNo with the control value.
     */
    if (control.value && !regex.test(control.value.trim())) {
      return {
        invalidPhoneNo: control.value
      };
    }

    /**
     * Return null if control has errors but have error other than invalidPhoneNo
     */
    if (control.errors && !control.errors.invalidPhoneNo) {
      return null;
    }

    return null;

  }

  /**
   * Validate Email
   * @param control: AbstractControl
   */
  static email(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

    /**
     * Return null if control has errors but have error other than invalidUrl
     */
    if (control.errors && !control.errors.invalidEmail) {
      return null;
    }

    /**
     * Check for regular expresion only if control has value.
     * If regular expression check failed, return invalidUrl with the control value.
     */
    if (control.value && !regex.test(control.value)) {
      return {
        invalidEmail: control.value
      };
    }

    return null;
  }

  /**
   * Function used for validating the Text Editor based on limit
   * @param limit: Text Editor Limit
   */
  static textEditor(limit: number): ValidatorFn | null {

    return (control: AbstractControl) => {

      // Removed HTML tags from string.
      const regEx = /(<([^>]+)>)/ig;
      const str = control.value.replace(regEx, '');
      const count = str.toString().length;

      // Return null if control has errors but have error other than invalidUrl
      if (control.errors) {
        return null;
      }

      //  Check if the count of string excluding html tags exceeds the limit
      if (control.value && count > limit) {
        return {
          fieldLimit: 30
        };
      }

      return null;
    };
  }

  /**
   * Validate for the valid GOOGLE ANALYTICS ID based on a condition that it must began with 'ua', 'yt' or 'mo'
   * @param control AbstractControl
   */
  static googleAnalytics(control: AbstractControl): ValidationErrors | null {

    if (control.value) {
      if (control.value.length < 4) {
        return {
          googleAnalyticsId: control.value
        };

      } else {
        const val = control.value.substring(0, 2 ).toLowerCase();

        if (val !== 'ua' && val !== 'yt' && val !== 'mo') {
          return {
            googleAnalyticsId: control.value
          };
        }
      }
    }


    return null;
  }


  /**
   * Validate app store Link
   * @param fieldKey: value
   */
  static appStoreLinks(fieldKey: string): ValidatorFn | null {
    return (control: AbstractControl) => {
      const val = control.value;
      let isErr ;

      const regex = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.][a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$');

      /*
       * Check for regular expresion only if control has value.
       * If regular expression check failed, return invalidUrl with the control value.
       */
      if (control.value && !regex.test(control.value)) {
        return {
          invalidUrl: control.value
        };
      }

      /*
      * In case of url validation(s) are checked using validatorArray which consists of all
      * possible strings that a particular app store link can have.
      * */
      if (fieldKey === 'playStore') {

        if ( control.value) {
          isErr = !val.includes('play.google.com');
        }

        if (val && val.length > 0 && isErr) {
          return {
            playStoreLinks: fieldKey
          };
        } else {
          return null;
        }

      }

      if (fieldKey === 'appleStore') {

        if ( control.value) {
          isErr = !val.includes('apps.apple.com');
        }

        if (val && val.length > 0 && isErr) {
          return {
            playStoreLinks: fieldKey
          };
        } else {
          return null;
        }

      }
      return null;
    };

  }

  static numbers(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp('^[0-9 ]+$');

    /**
     * Return null if control has errors but have error other than invalidNumbers
     */
    if (control.errors && !control.errors.invalidNumbers) {
      return null;
    }

    /**
     * Check for regular expresion only if control has value.
     * If regular expression check failed, return invalidNumbers with the control value.
     */
    if (control.value && !regex.test(control.value)) {
      return {
        invalidNumbers: control.value
      };
    }

    return null;
  }
}
