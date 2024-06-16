import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';
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
}
