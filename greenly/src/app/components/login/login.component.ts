import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  constructor( private _FormBuilder: FormBuilder, private _Router: Router, private _AuthService: AuthService ) {}

  responseMessage !: string
  loginSub !: Subscription

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null,[ Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
  })

  loginData():void{
    if(this.loginForm.valid){
      this.loginSub = this._AuthService.logInUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.responseMessage = res.message
          setTimeout(() => {
            this._Router.navigate(["/home"])
          }, 2000)
          localStorage.setItem("userToken", res.token)
          this._AuthService.getDecodedInfo()
        }
      })}else{
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe()
  }
}
