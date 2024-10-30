import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupClientComponent } from './basic/components/signup-client/signup-client.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { SignupComapnyComponent } from './basic/components/signup-comapny/signup-comapny.component';
import { AllAddsComponent } from './company/pages/all-adds/all-adds.component';
import { HomeComponent } from './basic/components/home/home.component';

const routes: Routes = [
  { path: 'authenticate', component:LoginComponent},

  { path: 'register', component:SignupComponent},
  { path: 'register_client', component:SignupClientComponent},
  { path: 'register_company', component:SignupComapnyComponent},
  { path: 'home', component:HomeComponent},
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
   { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
