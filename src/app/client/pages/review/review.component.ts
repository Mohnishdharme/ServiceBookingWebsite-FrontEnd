import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from 'src/app/basic/components/service/auth/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
bookingId:number = this.activatedRoute.snapshot.params['id'];
validateForm!:FormGroup;

constructor(
  private activatedRoute:ActivatedRoute,
  private notification:NzNotificationService,
  private router:Router,
  private clientService:ClientService,
  private fb:FormBuilder,
 

){}

ngOnInit(){
  this.validateForm= this.fb.group({
    rating: [null,Validators.required],
    review: [null,Validators.required],
  })
}

giveReview(){
  const reviewDto={
    rating: this.validateForm.get("rating").value,
    review: this.validateForm.get("review").value,
    id:this.bookingId,
    userId: UserStorageService.getUserId()
  }

  this.clientService.postReview(reviewDto).subscribe(res=>{ 
    this.notification
    .success(
      'success',
      `Review posted successfuly`,
      { nzDuration: 500}
    );
    this.router.navigateByUrl("client/myBookings");
  }, error=>{
    this.notification
    .error(
      'error',
      `${error.message}`,
      {nzDuration:5000}
    )
  }
)
}






}
