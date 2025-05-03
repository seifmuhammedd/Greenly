import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOtpComponent implements OnInit {

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
      code: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })
  
    recoveryFormSubmit(): void {
      if (this.recoveryForm.valid) {
        this.email = this.email ?? localStorage.getItem('email');
    
        if (!this.email) {
          console.error("Email is null");
          return;
        }
    
        const code = this.recoveryForm.get('code')?.value;
        if (!code) {
          console.error("Code is empty");
          return;
        }
    
        const data = {
          email: this.email,
          code: this.recoveryForm.get('code')?.value
        };
        
        this._AuthService.confirmOtp(data).subscribe({
          next: () => {
            setTimeout(() => {
              this._Router.navigate(["/app/system/reset-password"])
            }, 2000);
          },
          error: err => console.log(err.message)
        });
        
      } else {
        this.recoveryForm.markAllAsTouched();
      }
    }    
    

}
