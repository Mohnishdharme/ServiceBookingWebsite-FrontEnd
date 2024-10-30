import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllAddsComponent } from './pages/all-adds/all-adds.component';
import { UpdateAdComponent } from './pages/update-ad/update-ad.component';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CreateAdComponent,
    AllAddsComponent,
    UpdateAdComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzUploadModule
  ]
})
export class CompanyModule { }
