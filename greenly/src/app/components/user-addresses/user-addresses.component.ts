import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddressesService } from '../../core/services/addresses.service';
import { IAddress } from '../../core/interfeces/i-address';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  constructor ( private _AddressesService:AddressesService, private _PaymentService: PaymentService, private _FormBuilder: FormBuilder ) {}

  addressesData!: IAddress[]

  addressOfOrderForm : FormGroup = this._FormBuilder.group({

  })

  ngOnInit(): void {
    this.getAllAddresses()
  }

  getAllAddresses():void {
    this._AddressesService.getAllAddresses().subscribe({
      next: (res) =>{
        this.addressesData = res
        console.log(res)
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  updateAddressToDefault(addressID: string):void{
    this._AddressesService.updateAddressToDefault(addressID).subscribe({
      next: (res) =>{
        this.getAllAddresses()
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  
  checkOut(addressData: object):void{
    this._PaymentService.checkOut(addressData).subscribe({
        next: (res) => {
          console.log(res);
          window.open(res.url, '_self');
        },
        error: (err) => {
          console.log(err);
        },
      });
    
  }
}