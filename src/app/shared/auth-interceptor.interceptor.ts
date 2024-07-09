import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminService } from './api/admin.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const admiApi=inject(AdminService)
  const adminToken=admiApi.getAdminToken();
  const cloneReq=req.clone({
    setHeaders:{
      Authorization:`Bearer ${adminToken}`
    }
  })
  return next(cloneReq);
};
