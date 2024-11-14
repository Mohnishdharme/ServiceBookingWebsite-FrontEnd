import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from './user-storage.service';

const BASIC_URL="https://servicebookingwebsite-1.onrender.com/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sendVerificationEmail(email: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      `${BASIC_URL}api/verify-email`,
      { email },
      { headers: headers, responseType: 'text' }
    );
  }

  private apiUrl = 'https://servicebookingwebsite-1.onrender.com/authenticate'; // Backend API URL

  constructor(private  http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  registerClient(signupRequestDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "client/signup",signupRequestDTO);
  }

  registerCompany(signupRequestDTO:any): Observable<any>{
    return this.http.post(BASIC_URL + "company/signup",signupRequestDTO);
  }

  // Login method to call backend API and return user data along with token
   login(email: string, password: string) {
    const body = { email, password };

    return this.http.post(this.apiUrl, body, { observe: 'response' })
      .pipe(
        map((response: any) => {
          let token = response.headers.get('Authorization');
          
          if (token) {
            token = token.replace('Bearer ', '');
            // Store token in local storage or session storage
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(response.body)
          }
          return response.body;
        })
      );
    }


}
