import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDashboadComponent } from './pages/client-dashboad/client-dashboad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { ReviewComponent } from './pages/review/review.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientDashboadComponent,
    AdDetailComponent,
    MyBookingComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,   // For nz-date-picker
    NzButtonModule,       // For nz-button
    NzGridModule,
  ]
})
export class ClientModule { }
