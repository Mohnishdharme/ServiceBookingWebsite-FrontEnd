import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent implements OnInit {
  validateForm!: FormGroup;
  isEmailSent = false;
  resendTimer = 0;
  private timerSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkedPassword: [null, [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const checkedPassword = form.get('checkedPassword');
    return password && checkedPassword && password.value === checkedPassword.value
      ? null : { 'passwordMismatch': true };
  }

  sendVerificationEmail() {
    const email = this.validateForm.get('email')?.value;
    if (!email) {
      this.notification.error(
        'Error',
        'Please enter an email address',
        { nzDuration: 5000 }
      );
      return;
    }

    this.authService.sendVerificationEmail(email).subscribe(
      (response: string) => {
        console.log("Verification email response:", response);
        this.isEmailSent = true;
        this.notification.success(
          'Success',
          response,
          { nzDuration: 5000 }
        );
        this.startResendTimer();
      },
      (error) => {
        console.error("Verification email error:", error);
        this.handleErrorResponse(error);
      }
    );
  }

  handleErrorResponse(error: any) {
    this.isEmailSent = false;
    if (error.status === 400 && error.error === 'User already verified') {
      this.notification.info(
        'Information',
        'This email is already verified. You can proceed with registration.',
        { nzDuration: 5000 }
      );
      this.isEmailSent = true; // Allow registration to proceed
    } else {
      this.notification.error(
        'Error',
        error.error || 'Failed to send verification email',
        { nzDuration: 5000 }
      );
    }
  }

  startResendTimer() {
    this.resendTimer = 60;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = interval(1000).pipe(
      take(60)
    ).subscribe(
      () => {
        this.resendTimer--;
        if (this.resendTimer === 0) {
          this.timerSubscription?.unsubscribe();
        }
      }
    );
  }

  submitForm() {
    if (this.validateForm.valid) {
      if (!this.isEmailSent) {
        this.notification.warning(
          'Warning',
          'Please verify your email before submitting',
          { nzDuration: 5000 }
        );
        return;
      }

      this.authService.registerClient(this.validateForm.value).subscribe(
        (res) => {
          this.notification.success(
            'Success',
            'Signup successful',
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl('/authenticate');
        },
        (error) => {
          this.notification.error(
            'Error',
            error.error || 'Signup failed',
            { nzDuration: 5000 }
          );
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}