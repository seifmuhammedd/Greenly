import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  constructor( private _FormBuilder: FormBuilder, private _Router: Router, private _AuthService: AuthService, private _ToastrService: ToastrService ) {}

  loginSub !: Subscription
  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null,[ Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
  })

  loginData():void{
    if(this.loginForm.valid){
      this.loginSub = this._AuthService.logInUser(this.loginForm.value).subscribe({
        next: (res) => {
          this._ToastrService.success("Logged in successfully" , "Greenly" , {timeOut : 1500})
          setTimeout(() => {
          this._AuthService.isLoggedIn.set(true)

          this._Router.navigate(["/app/system/home"])
          }, 2000);
          localStorage.setItem("userToken", res.token)
          this._AuthService.getDecodedInfo()
        },
        error: (err) => {
          this._ToastrService.error(err.error.message , "Greenly" , {timeOut : 2000})
        }
      })}else{
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe()
  }
}
