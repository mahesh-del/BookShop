import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../shared/api/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, InputIconModule, InputTextModule, IconFieldModule, AvatarModule, BadgeModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private adminApi=inject(AdminService)
  private route=inject(Router)
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command:()=>{
          this.adminApi.setAdminToken(''),this.route.navigateByUrl('/register')
        }
      },
      {
        label: 'Features',
        icon: 'pi pi-star'
      }
    ]
  }

  wishList() {

  }
  cart() {

  }

  logout()
  {
    this.adminApi.clearToken();
  }

}
