import { Routes } from '@angular/router';
import path from 'path';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';

export const routes: Routes = [
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'store',
        component:StoreComponent
    }
];
