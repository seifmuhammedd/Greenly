import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from '../../core/services/shop.service';
import { IProduct } from '../../core/interfeces/i-product';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-specific-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './edit-specific-product.component.html',
  styleUrl: './edit-specific-product.component.css'
})
export class EditSpecificProductComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder,
    private _ShopService: ShopService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  productID!: string | null;
  productDetails!: IProduct;

  editProductForm: FormGroup = this._FormBuilder.group({
    productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    shortDescription: ['', [Validators.required, Validators.minLength(10)]],
    longDescription: ['', [Validators.required, Validators.minLength(20)]],
    stock: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (productInfo) => {
        this.productID = productInfo.get('p_ID');
        if (this.productID) {
          this._ShopService.getSpecificProduct(this.productID).subscribe({
            next: (res) => {
              console.log("hello",res);
              this.productDetails = res;
              this.editProductForm.patchValue({
                productName: res.name,
                productPrice: res.price,
                shortDescription: res.shortdescription,
                longDescription: res.longdescription,
                stock: res.stock,
                price: res.price,
                imageCover: res.imageCover,
                images: res.images
              });
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

  editProduct(): void {
    if (this.editProductForm.valid) {
      this._ShopService.editProduct(this.productID, this.editProductForm.value).subscribe({
        next: (res) => {
          this.showAlert()  
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error('Failed to update product');
        }
      });
    } else {
      this._ToastrService.error('Please fill all required fields correctly');
      this.editProductForm.markAllAsTouched();
    }
  }

  showAlert() {
        Swal.fire({
          title: 'Product updated succesfully.',
          html: `<button id="customBtn" class="btn btn-success">Ok</button>`,
          showConfirmButton: false,
          icon: "success",
          draggable: true,
          didOpen: () => {
            const btn = document.getElementById('customBtn');
            btn?.addEventListener('click', () => {
              Swal.close();
              this._Router.navigate(['/admin/edit-product']); 
            });
          }
        });
      }
}
