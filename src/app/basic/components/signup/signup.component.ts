import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private router:Router){}




  // Method to redirect to 'register_client'
  redirectToClient(): void {
    this.router.navigate(['/register_client']);  // Ensure the leading '/'
  }

  // Method to redirect to 'register_company'
  redirectToCompany(): void {
    this.router.navigate(['/register_company']);  // Ensure the leading '/'
  }
}
