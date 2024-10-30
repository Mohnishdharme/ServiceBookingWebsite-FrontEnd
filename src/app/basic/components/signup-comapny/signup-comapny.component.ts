import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-signup-comapny',
  templateUrl: './signup-comapny.component.html',
  styleUrls: ['./signup-comapny.component.scss']
})
export class SignupComapnyComponent {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router){

  }
  ngOnInit(){
    this.validateForm = this.fb.group({
      email:[null, [Validators.email, Validators.required]],
      name:[null, [ Validators.required]],
      address:[null, [ Validators.required]],
      phone :[null, [ Validators.required]],
      password:[null, [ Validators.required]],
      checkedPassword:[null, [ Validators.required]],
    })


  }

  submitForm(){
    this.authService.registerCompany(this.validateForm.value).subscribe(res =>{
      this.notification
      .success(
        'successes',
        'signup sucsesfull',
        {nzDuration:5000}
      );
      this.router.navigateByUrl('/login')
    } , error =>{
      this.notification
      .error(
        'error',
        'signup failed',
        {nzDuration:5000}
      );
    });
    
  }

}
