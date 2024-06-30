import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../api/admin.service';

export const authGuard: CanActivateFn = (route, state) => {
  const adminApi=inject(AdminService)
  const router=inject(Router)
  const localData=adminApi.getAdminToken()
  if(localData!=null && localData!='')
    {
      return true
    } else {
      router.navigateByUrl('/register')
      return false
    }
};
