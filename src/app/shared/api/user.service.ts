import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  userRegister(obj:User):Observable<User>
  {
    return this.http.post("http://localhost:8080/customer/register",obj)
  }

  userlogin(val:Credentials):Observable<any>
  {
    return this.http.post("http://localhost:8080/customer/login",val)
  }
}
