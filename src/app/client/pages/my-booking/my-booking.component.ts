import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent {

  Bookings:any[]=[];

  constructor(
    private clientService:ClientService,
    private router:Router
  ){}

  ngOnInit(){
    this.MyBookings();
  }

  MyBookings(){
    this.clientService.myBookings().subscribe(res=> {
      this.Bookings = res;
     
    })

  }


}
