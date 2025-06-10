import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopService } from '../../core/services/shop.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private _FormBuilder: FormBuilder,
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addCategoryForm.invalid) {
      this.addCategoryForm.markAllAsTouched();
      return;
    }

    const formValue = this.addCategoryForm.value;
    this._CategoriesService.addCategory(formValue).subscribe({
      next: (res) => {
        this.showAlert();
      },
      error: (err) => {
        console.error('Error adding category:', err);
        this._ToastrService.error('Failed to add category');
      }
    });
  }

  showAlert() {
    Swal.fire({
      title: 'Category added successfully',
      html: `<button id="customBtn" class="btn btn-success">Ok</button>`,
      showConfirmButton: false,
      icon: 'success',
      didOpen: () => {
        const btn = document.getElementById('customBtn');
        btn?.addEventListener('click', () => {
          Swal.close();
          this._Router.navigate(['/admin/manage-categories']);
        });
      }
    });
  }
}