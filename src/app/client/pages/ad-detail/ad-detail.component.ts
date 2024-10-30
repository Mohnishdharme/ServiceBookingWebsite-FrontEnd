import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/basic/components/service/auth/user-storage.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent {

  validateform!: FormGroup;
  adId:any= this.activatedRoute.snapshot.params['id'];
  adData:any ;
  review:any;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private router :Router,
    private notification : NzNotificationService
  ){}


  
  

  ngOnInit(){
    this.validateform = this.fb.group({
      bookDate: [null , [Validators.required]]
    })
    this.getAdDetails();
  }

  getAdDetails(){
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res=> {  
      this.adData=res.adDto
      this.review = res.reviewDtos;  // Make sure this matches the structure in your response


    })
  }

  bookService(){
    const bookDto = {
      bookDate : this.validateform.get(['bookDate']).value,
      ad_id: this.adId,
      user_id: UserStorageService.getUserId()

    }
    this.clientService.bookService(bookDto).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `Request posted succesfully`,
        {nzDuration:500}
        
      );
      this.router.navigateByUrl("/client/dashboard");
      
    })
  }

}
