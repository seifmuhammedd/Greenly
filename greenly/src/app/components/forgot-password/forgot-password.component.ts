import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor( private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router ) { }

  recoveryForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })
   routerLink="/app/system/confirm-code"

  recoveryFormSubmit():void{
    if (this.recoveryForm.valid){
      this._AuthService.forgetPassword(this.recoveryForm.value).subscribe({
        next:()=>{
          this._AuthService.getDecodedInfo()
          localStorage.setItem("email",this.recoveryForm.get("email")?.value )
          this._Router.navigate(["/app/system/confirm-code"])
        },
        error: (err)=> console.log(err.message)
      })
    }else{
      this.recoveryForm.markAllAsTouched()
    }
  }

}
