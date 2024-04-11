import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-print-validation-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-validation-error.component.html',
  styleUrl: './print-validation-error.component.css'
})
export class PrintValidationErrorComponent {
  @Input('control') control: AbstractControl = new FormControl();

  getErrorMessage(errorKey: string): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      maxlength: `The maximum length for this field is ${this.control.errors![errorKey].requiredLength}, but actual length is ${this.control.errors![errorKey].actualLength}`,
      minlength: `The minimum length for this field is ${this.control.errors![errorKey].requiredLength}, but actual length is ${this.control.errors![errorKey].actualLength}`,
      email: 'A valid email is required'
    }
    return errorMessages[errorKey] || 'Invalid value'
  }
}