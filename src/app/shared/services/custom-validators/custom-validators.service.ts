import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import validator from 'validator';

export class CustomValidators {

  // Check If Input Contains Arabic Characters Only
  static isArabic(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValid = value.split('').every((word) => validator.isAlpha(word, 'ar-EG') || validator.isNumeric(word, { no_symbols: false }) || word === ' ');
    if (value && !isValid) {
      return { notArabic: true };
    }
    return null;
  }

  // Check If Input Contains English Characters Only
  static isEnglish(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValid = value.split('').every((word) => validator.isAlpha(word, 'en-US') || validator.isNumeric(word, { no_symbols: false }) || word === ' ');
    if (value && !isValid) {
      return { notEnglish: true };
    }
    return null;
  }

  // Check If Input Match Regex
  static isMatchRegex(regex): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const value = control.value.trim() as string;
      if (value && !validator.matches(value, regex)) {
        return { notMatchRegex: true };
      }
      return null;
    };
  }
}
