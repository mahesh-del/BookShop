import { Routes } from '@angular/router';
import path from 'path';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { authGuard } from './shared/guard/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';

export const routes: Routes = [
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'store',
        component:StoreComponent,
        canActivate:[authGuard]
    },
    {
        path:'',
        component:LandingComponent
    },
    {
        path:'admin/dashboard',
        component:AdmindashboardComponent
    }
];
