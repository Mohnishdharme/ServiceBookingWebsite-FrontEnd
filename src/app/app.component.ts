import { Component } from '@angular/core';
import { UserStorageService } from './basic/components/service/auth/user-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'serviceBookingSystemWeb';
  isMobileMenuOpen = false;
  
  isClientLoggedIn:boolean=UserStorageService.isClientLoggedIn();
  isCompanyLoggedIn:boolean=UserStorageService.isComapnyLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStorageService.isComapnyLoggedIn();
  
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('authenticate');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
