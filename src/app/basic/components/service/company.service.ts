import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from './auth/user-storage.service'; // Ensure correct path


const BASIC_URL = "https://servicebookingwebsite-1.onrender.com"; // Ensure this is your correct backend URL

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  // Method to post an ad
  postAd(adDTO:any): Observable<any> {
    // Retrieve the user_id as a string from UserStorageService
    const user_id: string = UserStorageService.getUserId();
    const token = UserStorageService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      

    });

    //console.log(headers);

    // Make the POST request to the backend with the JWT token in the headers
    return this.http.post(`${BASIC_URL}api/company/ad/${user_id}`, adDTO, {
      headers
    })
    
  }


  getAllAdd(): Observable<any> {
    // Retrieve the user_id as a string from UserStorageService
    const user_id: string = UserStorageService.getUserId();
    
    // Use the createAuthHeader method to set Authorization header
    const headers = this.createAuthHeader().set('Content-Type', 'application/json');

    // Make the GET request to the backend with the JWT token in the headers
    return this.http.get(`${BASIC_URL}api/company/ads/${user_id}`, {
      headers
    });
  }
  

  createAuthHeader(): HttpHeaders{
    
    let authHeader :HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization', `Bearer `+UserStorageService.getToken()
    )
  }


  getAdd(ad_id:any): Observable<any> {
    // Retrieve the user_id as a string from UserStorageService
  
    const token = UserStorageService.getToken();
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      

    });

    //console.log(headers);

    // Make the POST request to the backend with the JWT token in the headers
    return this.http.get(`${BASIC_URL}api/company/ad/${ad_id}`,  {
      headers
    })
    
  }

  updateteAd(adId:any ,adDTO:any): Observable<any>{
    console.log(adId)
    return this.http.put(`${BASIC_URL}api/company/ad/${adId}`, adDTO, {
      headers:this.createAuthHeader()
    })
  }

  deleteAd(adId:any): Observable<any>{
    return this.http.delete(`${BASIC_URL}api/company/ad/${adId}`, {
      headers:this.createAuthHeader()
    })
  }

  getAllBookings(): Observable<any>{
    const company_id = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}api/company/ad/bookings/${company_id}`, {
      headers:this.createAuthHeader()
    })
  }




  changeBookingStatus(booking_id: number, status: string): Observable<any> {
    return this.http.post(`${BASIC_URL}api/company/ad/bookingStatus/${booking_id}/${status}`, {}, {
      headers: this.createAuthHeader()
    });
  }
  


}
