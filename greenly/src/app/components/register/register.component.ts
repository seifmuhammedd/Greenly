import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  
  constructor( private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService ) {}

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
          sessionStorage.setItem("email", this.registerForm.get("email")?.value)
          this.showAlert()
        },
        error: (err) =>{
          this._ToastrService.error(err.error.message , "Greenly" , {timeOut : 2000})
        }
      })
    }else {
      this.registerForm.setErrors({"missMatch":true})
      this.registerForm.markAllAsTouched()
    }
  }
  showAlert() {
      Swal.fire({
        title: 'We sent you a confirmation code, Please check your email.',
        html: `<button id="customBtn" class="btn btn-success">Ok</button>`,
        showConfirmButton: false,
        icon: "success",
        draggable: true,
        didOpen: () => {
          const btn = document.getElementById('customBtn');
          btn?.addEventListener('click', () => {
            Swal.close();
            this._Router.navigate(['/app/system/confirm-email']); 
          });
        }
      });
    }


  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }
}
