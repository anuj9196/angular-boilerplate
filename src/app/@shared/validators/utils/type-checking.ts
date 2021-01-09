import {Injectable} from '@angular/core';

/**
 * Check the type of the given value.
 *
 * @example
 * typeChecking.isString('abc');
 */
@Injectable({
  providedIn: 'root'
})
export class TypeChecking {

  constructor() {}

  /**
   * Check if value type is string.
   *
   * @param value Value
   */
  public isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
  }

  /**
   * Check if given value is a number.
   *
   * @param value Value
   */
  public isNumber(value: any): boolean {
    return typeof value === 'number' && isFinite(value);
  }

  /**
   * Check if value is an array.
   *
   * @param value Value
   */
  public isArray(value: any): boolean {
    try {
      return Array.isArray(value);
    } catch (e) {
      return value && typeof value === 'object' && value.constructor === Array;
    }
  }

  /**
   * Check if given value is a function.
   *
   * @param value Value
   */
  public isFunction(value: any): boolean {
    return typeof value === 'function';
  }

  /**
   * Check if given value is an object
   *
   * @param value Value
   */
  public isObject(value: any): boolean {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  /**
   * Check if given value is null
   *
   * @param value Value
   */
  public isNull(value: any): boolean {
    return value === null;
  }

  /**
   * Check if given value is undefined
   *
   * @param value Value
   */
  public isUndefined(value: any): boolean {
    return typeof value === 'undefined' || value === undefined;
  }

  /**
   * Check if given value is boolean type
   *
   * @param value Value
   */
  public isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  /**
   * Check if given value is a regular expression
   *
   * @param value Value
   */
  public isRegExp(value: any): boolean {
    return value && typeof value === 'object' && value.constructor === RegExp;
  }

  /**
   * Check if given value is an error.
   *
   * @param value Value
   */
  public isError(value: any): boolean {
    return value instanceof Error && typeof value.message !== 'undefined';
  }

  /**
   * Check if given value is Date
   * @param value Value
   */
  public isDate(value: any): boolean {
    return value instanceof Date;
  }

  /**
   * Check if given value is a symbol.
   *
   * @param value Value
   */
  public isSymbol(value: any): boolean {
    return typeof value === 'symbol';
  }

  /**
   * Function used to add http if it's not present in URL
   * @param url: URL
   * @param secure: If true, will convert http to https
   * TypeL String
   */
  public addHttpToURL(url: string, secure = false): string {

    if (!/^(?:f|ht)tps?:\/\//.test(url)) {

      const urlArr = url.split('://');
      url = urlArr[urlArr.length - 1];
      url = 'http://' + url;
    }

    if (secure) {
      if (!url.startsWith('https')) {
        url = url.replace('http', 'https');
      }
    }

    return url;
  }
}
