import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.scss']
})
export class SignupClientComponent {

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
      lastname:[null, [ Validators.required]],
      phone :[null, [ Validators.required]],
      password:[null, [ Validators.required]],
      checkedPassword:[null, [ Validators.required]],
    })


  }

  submitForm(){
    this.authService.registerClient(this.validateForm.value).subscribe(res =>{
      this.notification
      .success(
        'successes',
        'signup sucsesfull',
        {nzDuration:5000}
      );
      this.router.navigateByUrl('/authenticate')
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
