import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserStorageService } from 'src/app/basic/components/service/auth/user-storage.service';


const BASIC_URL = "https://servicebookingwebsite-1.onrender.com";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  

  constructor(private http :HttpClient) { }

  getAllAdd(): Observable<any> {
 
    
    // Use the createAuthHeader method to set Authorization header
    const headers = this.createAuthHeader().set('Content-Type', 'application/json');
  
    // Make the GET request to the backend with the JWT token in the headers
    return this.http.get(`${BASIC_URL}api/client/ads`, {
      headers
    });
  }


  searchAdByServiceName(service_name:any): Observable<any> {
    const headers = this.createAuthHeader().set('Content-Type', 'application/json');
    return this.http.get(`${BASIC_URL}api/client/ads/search/${service_name}`, {
      headers
    });
  }

  getAdDetailsByAdId(adId:any): Observable<any> {
    const headers = this.createAuthHeader().set('Content-Type', 'application/json');
    return this.http.get(`${BASIC_URL}api/client/ad/details/${adId}`, {
      headers
    });
  }

  bookService(bookDto :any): Observable<any> {
    const headers = this.createAuthHeader().set('Content-Type', 'application/json');

    return this.http.post(`${BASIC_URL}api/client/ad/bookService`,bookDto ,{
      headers,
    });
  }

  myBookings( ): Observable<any> {
    const user_id = UserStorageService.getUserId()
    const headers = this.createAuthHeader().set('Content-Type', 'application/json');

    return this.http.get(`${BASIC_URL}api/client/mybookings/${user_id}`,{
      headers,
    });
  }

  postReview( reviewDto:any): Observable<any> {
    const headers = this.createAuthHeader().set('Content-Type', 'application/json')
    return this.http.post(`${BASIC_URL}api/client/review`,reviewDto,{
      headers,
    });
  }

  createAuthHeader(): HttpHeaders{
    let authHeader :HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization', `Bearer `+UserStorageService.getToken()
    )
  }
}
