import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Admin, Credentials } from '../../shared/models';
import { AdminService } from '../../shared/api/admin.service';
import { UserService } from '../../shared/api/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CommonService } from '../../shared/api/common.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DropdownModule,FormsModule, ChipModule ,InputGroupModule, InputGroupAddonModule, InputTextModule,TabViewModule, ReactiveFormsModule, PasswordModule, CheckboxModule, ButtonModule, ToastModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  roles:any[]=[{role:"Admin"},{role:"User"}]
  userType='';
  checked = false;
  error = '';
  private api = inject(AdminService)
  private userApi = inject(UserService)
  private commonApi=inject(CommonService)
  private messageService = inject(MessageService)
  private route=inject(Router)
  formData: WritableSignal<Admin> = signal(
    { "firstName": "", "lastName": "", "email": "", "password": "", "address": "", "city": "", "role": "" }
  )
  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    address: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    city: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    role: new FormControl("")
  })

  loginForm = new FormGroup({
    email: new FormControl(this.api.getEmail(), [Validators.required, Validators.email]),
    password: new FormControl(this.api.getPassword(), [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(false)
  })

  onSubmit() {
    let formData = this.registerForm.value;
    this.setData(formData);
    this.registerForm.reset();
  }

  setData(obj: Admin) {
    if (obj.role == "" || obj.role == "false" || obj.role == "user") {
      obj.role = "user"
      this.userApi.userRegister(obj).subscribe({
        next:data=>{
          this.showSuccess('registration Success')
          this.formData.set(data)
        },
        error:err=>{
          this.error=err.error
          this.showError(this.error)
        }
      })
    } else {
      obj.role = "admin"
      this.api.adminRegister(obj).subscribe({
        next:data=>{
          this.formData.set(data)
          this.showSuccess('Registration Success')
        },
        error:err=>{
          this.error=err.statusText
          this.showError(this.error)
        }
      })
    }
  }

  onLogin()
  {
    this.checked=this.loginForm.get('remember')?.value ? true : false
    let loggedData=this.loginForm.value;
    if(this.userType.toString().toLowerCase()==="user")
      {
        this.userApi.userlogin(loggedData).subscribe({
          next:(data)=>{
            console.log("hello",data)
            if(data.customer!=null)
              {
                this.commonApi.setRole('user');
              } else {
                this.commonApi.setRole('admin');
              }
            this.api.setAdminToken(data.token);
            this.showSuccess('Login Success')
            this.route.navigateByUrl('/store')
            if(this.checked)
              {
                this.api.setEmail(loggedData.email);
                this.api.setPassword(loggedData.password);
              }
          },
          error:(err)=>{
            this.showError(err.error)
          }
        })
      }
      else{
        this.api.adminLogin(loggedData).subscribe({
          next:(data)=>{
            console.log("hello",data)
            if(data.admin!=null)
              {
                this.commonApi.setRole('admin');
              } else {
                this.commonApi.setRole('user');
              }
            this.api.setAdminToken(data.token);
            this.showSuccess('Login Success')
            this.route.navigateByUrl('/store')
            if(this.checked)
              {
                this.api.setEmail(loggedData.email);
                this.api.setPassword(loggedData.password);
              }
          },
          error:(err)=>{
            this.showError(err.error)
          }
        })
      }
  }
  showSuccess(val:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail:val });
  }
  showError(error:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
}
}
