import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboad',
  templateUrl: './client-dashboad.component.html',
  styleUrls: ['./client-dashboad.component.scss']
})
export class ClientDashboadComponent implements OnInit {

  ads: any = [];
  validateform!: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form control with an empty string and add validators
    this.validateform = this.fb.group({
      service: ['', Validators.required]
    });
    this.getAllAds();
    

    // Get all ads when the component is initialized
    
  }

  // Method to fetch all ads
  getAllAds() {
    this.clientService.getAllAdd().subscribe(res => {
      this.ads = res;

    });
    
  }

  // Method to search ads by service name
  SearchAdByName() {
    // Ensure you get the actual value from the 'service' form control
    const serviceName = this.validateform.get('service')?.value;

    // Call the service with the value from the search input
    this.clientService.searchAdByServiceName(serviceName).subscribe(res => {
    
      this.ads = res;
    });
    
  }
}
