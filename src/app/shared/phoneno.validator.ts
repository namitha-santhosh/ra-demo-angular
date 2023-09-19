import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function for phone number format
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern = /^[0-9]{10}$/; // You can adjust this pattern as needed
    const isValid = phoneNumberPattern.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };  };
}
