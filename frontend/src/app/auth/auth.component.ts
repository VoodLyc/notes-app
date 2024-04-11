import { Component, OnInit } from '@angular/core';
import { PrintValidationErrorComponent } from '../shared/components/print-validation-error/print-validation-error.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrintValidationErrorComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isSignInMode: boolean = true
  isSignInModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(true)
  authForm: FormGroup = new FormGroup({});


  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  onSwitchMode(): void {
    this.isSignInModeSubject.next(!this.isSignInModeSubject.value);
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
    this.isSignInModeSubject.subscribe(
      (isSignInMode: boolean) => {
        this.isSignInMode = isSignInMode;
        this.switchValidators();
      }
    )
  }

  switchValidators(): void {
    this.authForm.reset();
    let emailControl = this.authForm.get('email');
    let passwordControl = this.authForm.get('password');
    if (this.isSignInMode) {
      emailControl?.setValidators([Validators.required, Validators.email]);
      passwordControl?.setValidators(Validators.required);
    }
    else {
      emailControl?.setValidators([Validators.required, Validators.email, Validators.maxLength(50)]);
      passwordControl?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(50)]);
    }
  }

  onSubmit(): void {
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];
    if (this.isSignInMode) {
      this.SignIn(email, password);
    }
    else {
      this.register(email, password);
    }
    this.authForm.reset();
  }


  register(email: string, password: string) {
    this.authService.register(email, password).subscribe({
      next: () => {
        this.toastr.success(`You registered successfully`, 'Registered!', { timeOut: 5000 });
        this.router.navigate(['home', 'notes']);
      },
      error: (errorMessage: Error) => {
        this.toastr.error(errorMessage.message, 'Error', { timeOut: 5000 });
      }
    })
  }

  SignIn(email: string, password: string) {
    this.authService.signIn(email, password).subscribe({
      next: () => {
        this.router.navigate(['home', 'notes']);
      },
      error: (errorMessage: Error) => {
        this.toastr.error("Bad credentials", 'Error', { timeOut: 5000 });
      }
    })
  }
}
