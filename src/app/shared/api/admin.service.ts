import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Admin, Credentials } from '../models';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  localStorage = this.document.defaultView?.localStorage;

  private http = inject(HttpClient)

  adminRegister(admin: Admin): Observable<Admin> {
    return this.http.post("http://localhost:8080/admin/register", admin)
  }

  adminLogin(credentials: Credentials): Observable<any> {
    return this.http.post("http://localhost:8080/admin/login", credentials)
  }

  setEmail(val: any) {
    if (this.localStorage) {
      this.localStorage.setItem('email', val);
    }

  }

  setPassword(val: any) {
    if (this.localStorage) {
      this.localStorage.setItem('password', val);
    }
  }
  getEmail() {
    if (this.localStorage) {
      return this.localStorage.getItem('email');
    }
    return;
  }

  getPassword() {
    if (this.localStorage) {
      return this.localStorage.getItem('password');
    }
    return;
  }
  setAdminToken(val:any)
  {
    this.localStorage?.setItem('admintoken',val)
  }
  getAdminToken()
  {
    return this.localStorage?.getItem('admintoken')
  }

}
