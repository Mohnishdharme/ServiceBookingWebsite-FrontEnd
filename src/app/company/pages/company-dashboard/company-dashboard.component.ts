import { Component } from '@angular/core';
import { NzNotificationComponent } from 'ng-zorro-antd/notification';
import { CompanyService } from 'src/app/basic/components/service/company.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {

  bookings: any[] = [];
  reservation:string;

  constructor(
    private conpanySevice: CompanyService,
    
  ){}



  ngOnInit(){
    this.getAllBookings();
  }

  getAllBookings(){
    this.conpanySevice.getAllBookings().subscribe( res=>{
      console.log(res);
     this.bookings= res;
    })
  }

  // Method to handle booking approval
  approveBooking(booking_id: any) {
    
    this.reservation='APPROVED';  // Update reservation status
    // Call API or perform further actions for approval
    this.conpanySevice.changeBookingStatus(booking_id, this.reservation).subscribe(res => {
      this.getAllBookings();
    });
   
  }

  // Method to handle booking rejection
  rejectBooking(booking_id: any ) {
    
    this.reservation='REJECTED';
    // Call API or perform further actions for rejection
    this.conpanySevice.changeBookingStatus(booking_id, this.reservation ).subscribe(res => {
      this.getAllBookings();
    });

  }
}
