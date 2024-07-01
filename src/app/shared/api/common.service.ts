import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  role:any;
  setRole(val:any)
  {
    return this.role=val
  }

  getRole()
  {
    return this.role
  }
}
