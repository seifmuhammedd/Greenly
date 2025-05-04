import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnDestroy {

  constructor( private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router ) { }

      private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  
  
  confrimEmailSub !: Subscription
  email !: string|null
  
    ngOnInit(): void {
      if(isPlatformBrowser(this._PLATFORM_ID)){
        if(sessionStorage.getItem("email")){
          this.email = sessionStorage.getItem("email")
        }
      }
    }

  confirmEmailForm = this._FormBuilder.group({
    code: [null , [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
  })

  confrimEmail():void{
    if(this.confirmEmailForm.valid){
      this.email = this.email ?? localStorage.getItem('email');
    
        if (!this.email) {
          console.error("Email is null");
          return;
        }
    
        const code = this.confirmEmailForm.get('code')?.value;
        if (!code) {
          console.error("Code is empty");
          return;
        }
    
        const data = {
          email: this.email,
          code: this.confirmEmailForm.get('code')?.value
        };

      this.confrimEmailSub = this._AuthService.confirmEmail(data).subscribe({
        next: (res) =>{
          this._ToastrService.success(res.message , "Greenly" , {timeOut : 2000})
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
