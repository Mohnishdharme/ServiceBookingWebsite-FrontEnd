import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from 'src/app/basic/components/service/company.service';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent implements OnInit {
  adId: any;
  validateForm!: FormGroup;
  imagePreview: string | null = null;  // For displaying the preview of the image URL

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.adId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    // Initialize the form group with controls and validation
    this.validateForm = this.fb.group({
      serviceName: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      img: [null, [Validators.required]], // Image URL field with validation
    });
    
    // Load the ad details when component is initialized
    this.getAdById();
  }

  // Fetch ad details by ID and populate the form
  getAdById() {
    this.companyService.getAdd(this.adId).subscribe(
      (res: any) => {
        if (res) {
          // Use patchValue to populate the form with ad details
          this.validateForm.patchValue({
            serviceName: res.serviceName,
            description: res.description,
            price: res.price,
            img: res.img
          });
          this.imagePreview = res.img; // Set the image preview
        }
      },
      (error) => {
        this.notification.error('Error', `Failed to load ad details: ${error.message}`);
      }
    );
  }

  // Handle ad update form submission
  updateAd() {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value; // Collect form data

      this.companyService.updateteAd(this.adId, formData).subscribe(
        (res) => {
          this.notification.success('Success', 'Ad updated successfully');
          this.router.navigate(['/company/ads']); // Navigate to another page if needed
        },
        (error) => {
          this.notification.error('Error', `Failed to update ad: ${error.error}`);
        }
      );
    } else {
      this.notification.error('Error', 'Please fill in all required fields.');
    }
  }
}
