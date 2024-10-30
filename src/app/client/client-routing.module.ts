import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientDashboadComponent } from './pages/client-dashboad/client-dashboad.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { ReviewComponent } from './pages/review/review.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'dashboard', component: ClientDashboadComponent},
  { path: 'ad/:id', component: AdDetailComponent},
 { path: 'myBookings/:id', component: AdDetailComponent},
 { path: 'review/:id', component: ReviewComponent},
  { path: 'myBookings', component: MyBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
