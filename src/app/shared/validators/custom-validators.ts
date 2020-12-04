import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static confirmPassword(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPass = control.get('confirmPass');
    if (password.pristine || confirmPass.pristine) return null;
    return password && confirmPass && password.value !== confirmPass.value
      ? { misMatch: true }
      : null;
  }
  static validatePatternFor(inputType: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let result: boolean;
      switch (inputType) {
        case 'username': {
          result = /^[0-9A-Za-z_.]+$/.test(control.value);
          return !result ? { usernamePattern: false } : null;
        }
        default:
          return null;
      }
    };
  }
}
