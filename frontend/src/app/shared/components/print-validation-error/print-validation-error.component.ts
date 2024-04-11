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
      maxlength: `The maximum length for this field is 20`,
      duplicatedName: `A tag with the name ${this.control.value?.toString()?.toLowerCase()} already exists, please choose a different name`
    }
    return errorMessages[errorKey] || 'Invalid value'
  }
}