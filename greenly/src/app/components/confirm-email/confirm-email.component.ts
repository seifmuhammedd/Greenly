import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnDestroy {

  constructor( private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router ) { }

  confrimEmailSub !: Subscription
  
  confirmEmailForm = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    code: [null , [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
  })

  confrimEmail():void{
    if(this.confirmEmailForm.valid){
      this.confrimEmailSub = this._AuthService.confirmEmail(this.confirmEmailForm.value).subscribe({
        next: (res) =>{
          this._ToastrService.success(res.message , "Greenly" , {timeOut : 20000})
          setTimeout(() => {
            this._Router.navigate(["/app/system/login"])
          },2000)
        },
        error: (err) =>{
          this._ToastrService.error(err.error.message , "Greenly")
        }
      })
    }else {
      this.confirmEmailForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.confrimEmailSub?.unsubscribe
  }

}
