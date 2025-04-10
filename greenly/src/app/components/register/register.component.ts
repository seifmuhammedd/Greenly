import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  
  constructor( private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router ) {}

  responseMessage !: string
  registerSub !: Subscription
  
  registerForm: FormGroup = this._FormBuilder.group({
    userName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    age: [null, [Validators.required, Validators.pattern(/^[1-9][0-9]?$/), Validators.min(18), Validators.max(99)]],
    phone: [null, [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    confirmPassword: [null]
  }, {validators: this.comparePassword});

  comparePassword (g : AbstractControl):(null|object){
    if (g.get("password")?.value === g.get("confirmPassword")?.value){
      return null
    }else{
      return {'missMatch':true}
    }
  }

  registerData():void{
    if(this.registerForm.valid){
      this.registerSub = this._AuthService.registerUser(this.registerForm.value).subscribe({
        next: (res) =>{
          this.responseMessage = res.message
          setTimeout(() => {
            this._Router.navigate(["/login"])
          },2000)
        }
      })
    }else {
      console.log(this.registerForm)
      this.registerForm.setErrors({"missMatch":true})
      this.registerForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }
}
