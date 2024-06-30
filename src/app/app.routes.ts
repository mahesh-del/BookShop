import { Routes } from '@angular/router';
import path from 'path';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'store',
        component:StoreComponent,
        canActivate:[authGuard]
    }
];
