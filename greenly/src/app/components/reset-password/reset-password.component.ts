import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  constructor( private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router ) { }

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
    email !: string|null
  
    ngOnInit(): void {
      if(isPlatformBrowser(this._PLATFORM_ID)){
        if(localStorage.getItem("email")){
          this.email = localStorage.getItem("email")
        }
      }
    }
  
    recoveryForm: FormGroup = this._FormBuilder.group({
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
    }, {validators: this.comparePassword})

    comparePassword (g : AbstractControl):(null|object){
        if (g.get("password")?.value === g.get("confirmPassword")?.value){
          return null
        }else{
          return {'missMatch':true}
        }
      }
  
    recoveryFormSubmit():void{
      if (this.recoveryForm.valid) {
        this.email = this.email ?? localStorage.getItem('email');
    
        if (!this.email) {
          console.error("Email is null");
          return;
        }
    
        const data = {
          email: this.email,
          password: this.recoveryForm.get('password')?.value,
          confirmPassword: this.recoveryForm.get('confirmPassword')?.value
        };
        
        this._AuthService.resetPassword(data).subscribe({
          next: (res) => {
            console.log(res)
            setTimeout(() => {
              this._Router.navigate(["/app/system/login"])
            }, 2000);
          },
          error: err => console.log(err.message)
        });
        
      } else {
        this.recoveryForm.markAllAsTouched();
      }
    }    
  

}
