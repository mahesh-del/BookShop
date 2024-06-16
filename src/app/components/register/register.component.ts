import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Admin } from '../../shared/models';
import { AdminService } from '../../shared/api/admin.service';
import { UserService } from '../../shared/api/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, PasswordModule, CheckboxModule, ButtonModule, ToastModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  checked = false;
  error = '';
  private api = inject(AdminService)
  private userApi = inject(UserService)
  private messageService = inject(MessageService)
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

  onSubmit() {
    let formData = this.registerForm.value;
    this.setData(formData);
  }

  setData(obj: Admin) {
    if (obj.role == "" || obj.role == "false") {
      obj.role = "user"
      this.userApi.userRegister(obj).subscribe(data => {
        this.showSuccess()
        this.formData.set(data)
      },
        error => {
          this.error = error.error
          this.showError(this.error)
        })
    } else {
      obj.role = "admin"
      this.api.adminRegister(obj).subscribe(data => {
        this.formData.set(data)
        this.showSuccess()
      }, error => {
        this.error = error.error
        this.showError(this.error)
      })
    }
    this.formData.set(obj);
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail:'Registered Succesfully' });
  }
  showError(error:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
}
}
