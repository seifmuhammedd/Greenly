import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../core/interfeces/i-category';

@Component({
  selector: 'app-add-sub-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css',
})
export class AddSubCategoryComponent implements OnInit {
  constructor(
    private _CategoriesService: CategoriesService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  categoriesData!: ICategory[];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
    
  }

  addSubCategoryForm = this._FormBuilder.group({
    name: ['', Validators.required],
    categoryid: ['', Validators.required],
    description: ['', Validators.required]
  })

  onSubmit() {
    if (this.addSubCategoryForm.valid) {
      this._CategoriesService.addSubCategory(this.addSubCategoryForm.value).subscribe({
        next: (res) => {
          this._ToastrService.success('Sub-category added successfully');
          this._Router.navigate(['/admin/manage-sub-categories']);
        },
        error: (err) => {
          console.error('Error adding sub-category:', err);
          this._ToastrService.error('Failed to add sub-category');
        }
      });
    } else {
      this._ToastrService.error('Please fill all required fields');
    }
  }
}
