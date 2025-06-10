import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _PaymentService: PaymentService
  ) {}

  addressForm: FormGroup = this._FormBuilder.group({
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    street: ['', Validators.required],
    building: ['', Validators.required],
    floor: ['', Validators.required],
    apartment: ['', Validators.required],
    postal_code: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/),
      ],
    ],
  });

  ngOnInit(): void {}

  submitAddress() {
    if (this.addressForm.valid) {
      console.log(localStorage.getItem("userToken"))
      // this._PaymentService.checkOut(this.addressForm.value).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     window.open(res.url)
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
