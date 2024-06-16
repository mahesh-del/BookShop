import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Admin, Credentials } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private http=inject(HttpClient)

  adminRegister(admin:Admin):Observable<Admin>
  {
    return this.http.post("http://localhost:8080/admin/register",admin)
  }

  adminLogin(credentials:Credentials):Observable<any>
  {
    return this.http.post("http://localhost:8080/admin/login",credentials)
  }

}
