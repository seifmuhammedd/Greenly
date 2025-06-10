import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfeces/i-category';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent implements OnInit {

  constructor ( private _CategoriesService: CategoriesService ) { }

  categoriesdata!: ICategory[]

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log('Categories fetched successfully:', res);
        this.categoriesdata = res
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  deleteCategory(c_ID: string | null): void {
    this._CategoriesService.deleteCategory(c_ID).subscribe({
      next: (res) => {
        this.categoriesdata = res
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }

}
