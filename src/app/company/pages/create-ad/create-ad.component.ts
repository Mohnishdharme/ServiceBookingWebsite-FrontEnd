import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from 'src/app/basic/components/service/company.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {

  imagePreview: string | null = null;  // For displaying the preview of the image URL
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      img: [null, [Validators.required]], // Image URL field with validation
    });
  }





  postAd() {
    if (this.validateForm.valid) {
      const formData = {
        serviceName: this.validateForm.get('serviceName')?.value,
        description: this.validateForm.get('description')?.value,
        price: this.validateForm.get('price')?.value,
        img: this.validateForm.get('img')?.value,  // Pass image URL instead of file
      };

      this.companyService.postAd(formData).subscribe(
        res => {
          this.notification.success('Success', 'Ad posted successfully');
          this.router.navigateByUrl("/company/ads"); // Navigate to another page if needed
        },
        error => {
          this.notification.error('Error', `Error: ${error.error}`);
        }
      );

     
    } else {
      this.notification.error('Error', 'Please fill in all required fields.');
    }
  }
}
