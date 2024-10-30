import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../service/auth/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 
 
 
})
export class LoginComponent {

  validateForm!: FormGroup;
error: any;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.validateForm= this.fb.group({
      email : [null,Validators.required],
      password : [null,Validators.required]
    })
  }

  submitForm(){
    this.authService.login(this.validateForm.get(['email'])!.value, this.validateForm.get(['password'])!.value)
    .subscribe(res =>{
      if (UserStorageService.isClientLoggedIn) {
        this.router.navigateByUrl('/client/dashboard');
      } else if (UserStorageService.isComapnyLoggedIn) {
        this.router.navigateByUrl('/company/dashboard');
      }
      
     

    },error =>{
      this.notification
      .error(
        'error',
        'bad credntials',
        
      )
    })
  }



}
