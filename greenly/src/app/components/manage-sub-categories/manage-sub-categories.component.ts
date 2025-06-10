import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ISubCategory } from '../../core/interfeces/i-sub-category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-sub-categories',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './manage-sub-categories.component.html',
  styleUrl: './manage-sub-categories.component.css'
})
export class ManageSubCategoriesComponent implements OnInit {

  constructor( private _CategoriesService: CategoriesService ) { }

   subCategoriesData!: ISubCategory[];

  ngOnInit(): void {
    this.getAllSubCategories();
  }

  getAllSubCategories() {
    this._CategoriesService.getAllSubCategories().subscribe({
      next: (res) => {
        this.subCategoriesData = res;
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      }
    });
  }

  deleteSubCategory(subCategoryId: string) {
    this._CategoriesService.deleteSubCategory(subCategoryId).subscribe({
      next: (res) => {
        this.subCategoriesData = res
      },
      error: (err) => {
        console.error('Error deleting subcategory:', err);
      }
    });
  }

}
