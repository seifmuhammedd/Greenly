import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  loginSub!: Subscription;
  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ],
    ],
  });

  loginData(): void {
    if (this.loginForm.valid) {
      this.loginSub = this._AuthService
        .logInUser(this.loginForm.value)
        .subscribe({
          next: (res) => {
            const token = res.data.accessToken;
            const decodedToken: any = jwtDecode(token);
            const role = decodedToken?.roleTypes;

            localStorage.setItem('userToken', token);
            localStorage.setItem('role', role);

            this._AuthService.isLoggedIn.set(true);
            console.log(decodedToken)
            setTimeout(() => {
              if (role === 'admin') {
                this._ToastrService.success(
                  "Logged in successfully",
                  'Greenly',
                  { timeOut: 2500 }
                );
                this._Router.navigate(['/admin/home']);
              } else {
                this._Router.navigate(['/app/system/home']);
                this._ToastrService.success(
                  'Logged in successfully',
                  'Greenly',
                  { timeOut: 2500 }
                );
              }
            }, 2000);
          },
          error: (err) => {
            this._ToastrService.error(err.error.message, 'Greenly', {
              timeOut: 2000,
            });
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
