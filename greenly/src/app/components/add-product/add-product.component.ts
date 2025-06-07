import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShopService } from '../../core/services/shop.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfeces/i-category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private _CategoriesService: CategoriesService,
    private _FormBuilder: FormBuilder,
    private _ShopService: ShopService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  categoriesData !: ICategory[];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });

  //   this.addProductForm.get('productCategory')?.valueChanges.subscribe(categoryId => {
  //   if (categoryId) {
  //     this.getSubCategories(categoryId);
  //   } else {
  //     this.subCategories = [];
  //     this.addProductForm.get('productSubCategory')?.setValue('');
  //   }
  // });
  }

  addProductForm: FormGroup = this._FormBuilder.group({
    productName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(150)],],
    productCategory: ['', [Validators.required]],
    productSubCategory: ['', [Validators.required]],
    shortDescription: ['', [Validators.required, Validators.minLength(10)]],
    longDescription: ['', [Validators.required, Validators.minLength(20)]],
    vendorName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(150)],],
    stock: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(1)]],
    imageCover: ['', [Validators.required]],
    images: ['', [Validators.required]],
  });

  onCoverImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.addProductForm.patchValue({ imageCover: file });
      this.addProductForm.get('imageCover')?.updateValueAndValidity();
    }
  }

  onImagesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.addProductForm.patchValue({ images: Array.from(files) });
      this.addProductForm.get('images')?.updateValueAndValidity();
    }
  }
}
