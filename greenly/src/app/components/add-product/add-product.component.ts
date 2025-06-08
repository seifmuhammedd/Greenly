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
import { ISubCategory } from '../../core/interfeces/i-sub-category';
import Swal from 'sweetalert2';

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

  categoriesData!: ICategory[];
  subCategories: ISubCategory[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });

    this.addProductForm
      .get('categoryid')
      ?.valueChanges.subscribe((categoryId) => {
        if (categoryId) {
          this.getSubCategories(categoryId);
        } else {
          this.subCategories = [];
          this.addProductForm.get('subcategoryid')?.setValue('');
        }
      });
  }

  addProductForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    categoryid: ['', [Validators.required]],
    subcategoryid: ['', [Validators.required]],
    shortDescription: ['', [Validators.required, Validators.minLength(10)]],
    longDescription: ['', [Validators.required, Validators.minLength(20)]],
    vendor: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    stock: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(1)]],
    ratingAvg: ['', [Validators.required, Validators.min(1)]],
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

  getSubCategories(categoryId: string) {
    this._CategoriesService.getSubCategoriesByCategory(categoryId).subscribe({
      next: (res) => {
        this.subCategories = res;
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      },
    });
  }

  onSubmit(): void {
  if (this.addProductForm.invalid) {
    this.addProductForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();

  formData.append('name', this.addProductForm.get('name')?.value);
  formData.append('categoryid', this.addProductForm.get('categoryid')?.value);
  formData.append('subcategoryid', this.addProductForm.get('subcategoryid')?.value);
  formData.append('shortDescription', this.addProductForm.get('shortDescription')?.value);
  formData.append('longDescription', this.addProductForm.get('longDescription')?.value);
  formData.append('vendor', this.addProductForm.get('vendor')?.value);
  formData.append('stock', this.addProductForm.get('stock')?.value);
  formData.append('price', this.addProductForm.get('price')?.value);
  formData.append('ratingAvg', this.addProductForm.get('ratingAvg')?.value);

  const cover = this.addProductForm.get('imageCover')?.value;
  if (cover) {
    formData.append('imageCover', cover);
  }

  const images: File[] = this.addProductForm.get('images')?.value;
  if (images && Array.isArray(images)) {
    images.forEach((img, index) => {
      formData.append('images', img);
    });
  }

  this._ShopService.addProduct(formData).subscribe({
    next: (res) => {
      this.showAlert();
    },
    error: (err) => {
      console.error('Error adding product:', err);
      this._ToastrService.error('Failed to add product');
    }
  });
  console.log('Form submitted:', this.addProductForm.value);
}

showAlert() {
      Swal.fire({
        title: 'Product added successfully',
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
