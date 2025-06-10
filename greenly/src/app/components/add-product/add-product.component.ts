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
import Swal from 'sweetalert2';
import { ICategory } from '../../core/interfeces/i-category';
import { ISubCategory } from '../../core/interfeces/i-sub-category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // Reactive form definition
  addProductForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    categoryid: ['', [Validators.required]],
    subcategoryid: ['', [Validators.required]],
    vendor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    stock: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(1)]],
    ratingAvg: ['', [Validators.required, Validators.min(1)]],
    shortdescription: ['', [Validators.required, Validators.minLength(10)]],
    longdescription: ['', [Validators.required, Validators.minLength(20)]],
    imageCover: [null, [Validators.required]],
    images: [null, [Validators.required]]
  });

  categoriesData!: ICategory[];
  subCategories: ISubCategory[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _shopService: ShopService,
    private _router: Router,
    private _toastr: ToastrService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    // Load all categories on init
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });

    // When category changes → get subcategories
    this.addProductForm.get('categoryid')?.valueChanges.subscribe((categoryId) => {
      if (categoryId) {
        this.getSubCategories(categoryId);
      } else {
        this.subCategories = [];
        this.addProductForm.get('subcategoryid')?.setValue('');
      }
    });
  }

  // Handle cover image selection
  onCoverImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.addProductForm.patchValue({ imageCover: file });
      this.addProductForm.get('imageCover')?.updateValueAndValidity();
    }
  }

  // Handle multiple images selection
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.addProductForm.patchValue({ images: files });
      this.addProductForm.get('images')?.updateValueAndValidity();
    }
  }

  // Fetch subcategories based on selected category
  getSubCategories(categoryId: string): void {
    this._categoriesService.getSubCategoriesByCategory(categoryId).subscribe({
      next: (res) => {
        this.subCategories = res;
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    // Append text fields
    formData.append('name', this.addProductForm.get('name')?.value || '');
    formData.append('categoryid', this.addProductForm.get('categoryid')?.value || '');
    formData.append('subcategoryid', this.addProductForm.get('subcategoryid')?.value || '');
    formData.append('vendor', this.addProductForm.get('vendor')?.value || '');
    formData.append('stock', this.addProductForm.get('stock')?.value || '');
    formData.append('price', this.addProductForm.get('price')?.value || '');
    formData.append('ratingAvg', this.addProductForm.get('ratingAvg')?.value || '');
    formData.append('shortdescription', this.addProductForm.get('shortdescription')?.value || '');
    formData.append('longdescription', this.addProductForm.get('longdescription')?.value || '');

    // Append Cover Image
    const coverImage = this.addProductForm.get('imageCover')?.value;
    if (coverImage instanceof File) {
      formData.append('imageCover', coverImage, coverImage.name);
    }

    // Append Additional Images
    const additionalImages = this.addProductForm.get('images')?.value;
    if (Array.isArray(additionalImages)) {
      additionalImages.forEach((file: File) => {
        if (file instanceof File) {
          formData.append('images', file, file.name);
        }
      });
    }

    // Show loading alert
    Swal.fire({
      title: 'Adding Product...',
      html: `
        <div class="d-flex justify-content-center mt-3">
          <div class="spinner-border text-success" role="status"></div>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      
    });

    // Submit the form data
    this._shopService.addProduct(formData).subscribe({
      next: (res) => {
        // Show success alert
        Swal.fire({
          title: 'Product added successfully',
          html: `<button id="customBtn" class="btn btn-success">Ok</button>`,
          icon: 'success',
          showConfirmButton: false,
          didOpen: () => {
            const btn = document.getElementById('customBtn');
            btn?.addEventListener('click', () => {
              Swal.close();
              this._router.navigate(['/admin/edit-product']);
            });
          }
        });
      },
      error: (err) => {
        // Close loader and show error
        Swal.close();
        console.error('Error adding product:', err);
        this._toastr.error('Failed to add product.', 'Error');
      }
    });
  }
}