import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from 'src/app/basic/components/service/company.service';

@Component({
  selector: 'app-all-adds',
  templateUrl: './all-adds.component.html',
  styleUrls: ['./all-adds.component.scss']
})
export class AllAddsComponent {
searchTerm: any;
filterAds() {
throw new Error('Method not implemented.');
}
filteredAds: any;

  constructor(private companyService:CompanyService,
    private notification: NzNotificationService,
  ){}

  ads:any

  ngOnInit(){
    this.getAllAdsByUserID();
   
  }

  getAllAdsByUserID(){
     this.companyService.getAllAdd().subscribe( res =>{
      this.ads=res;

    })
  }

  confirmDelete(adId: number): void {
    if (confirm('Are you sure you want to delete this ad?')) {
      this.deleteAd(adId);
    }
  }
  

  deleteAd(adId:any){
    this.companyService.deleteAd(adId).subscribe(res=>{
      this.notification
      .success(
        'success',
        'adDeleted Succesfull',
        {nzDuration:400}
      );
      this.getAllAdsByUserID();
    })
  }

}
