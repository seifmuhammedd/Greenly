import { DatePipe, NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { ProfileService } from '../../core/services/profile.service';
import { Subscription } from 'rxjs';
import { IProfile } from '../../core/interfeces/i-profile';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { IBlog } from '../../core/interfeces/i-blog';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, DatePipe, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(
    private _BlogService: BlogService,
    private _ProfileService: ProfileService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  personalInfoSub!: Subscription;
  blogSub!: Subscription;

  personalInfo!: IProfile;
  blogData !: IBlog[]

  ngOnInit(): void {
    this.personalInfoSub = this._ProfileService
      .getUserPersonalInfo()
      .subscribe({
        next: (res) => {
          this.personalInfo = res.data;
          this.blogSub = this._BlogService.getUserPosts(this.personalInfo?.userID).subscribe({
            next: (res) => {
              this.blogData = res.data
            },
            error: (err) => {
              console.log(err.message)
            }
          })
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

  personalInfoForm: FormGroup = this._FormBuilder.group({
    userName: [null, [Validators.required]],
    phone: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/),
      ],
    ],
  });

  updatePasswordForm: FormGroup = this._FormBuilder.group({
    oldPassword: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ],
    ],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ],
    ],
    confirmPassword: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ],
    ],
  });

  isPasswordVisible = {
    old: false,
    new: false,
    confirm: false,
  };

  togglePasswordVisibility(field: 'old' | 'new' | 'confirm'): void {
    this.isPasswordVisible[field] = !this.isPasswordVisible[field];
  }

  editPersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      this._ProfileService
        .updateUserPersonalInfo(this.personalInfoForm.value)
        .subscribe({
          next: (res) => {
            this._ToastrService.success('Updated Successfully', 'Greenly', {
              timeOut: 2000,
            });
          },
          error: (err) => {
            console.log(err.message);
          },
        });
    }
  }

  editPassword(): void {
    if (this.updatePasswordForm.valid) {
      this._ProfileService
        .updatePassword(this.updatePasswordForm.value)
        .subscribe({
          next: (res) => {
            this._ToastrService.success(
              ' Password Updated Successfully',
              'Greenly',
              { timeOut: 2000 }
            );
            setTimeout(() => {
              this._Router.navigate(['/app/system/login']);
            }, 3000);
          },
          error: (err) => {
            console.log(err.message);
          },
        });
    }
  }

  deletePost(postID: string):void{
    this._BlogService.deletePost(postID).subscribe({
      next: (res) => {
        this.blogData = res.data
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }
}
