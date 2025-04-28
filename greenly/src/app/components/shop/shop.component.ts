import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { Subscription } from 'rxjs';
import { IShop } from '../../core/interfeces/i-shop';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfeces/i-category';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {

  constructor(
    private _ShopService: ShopService,
    private _CategoriesService: CategoriesService
  ) {}

  shopData!: IShop;
  categoriesData!: ICategory[];
  productsSub!: Subscription;
  categoriesSub!: Subscription;

  ngOnInit(): void {
    this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.productsSub = this._ShopService.getProductsByCategory("680f9db0a65c13f4c7fb9a0c").subscribe({
      next: (res) => {
        this.shopData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductsByCategory(p_ID: string):void{
    this.productsSub = this._ShopService.getProductsByCategory(p_ID).subscribe({
      next: (res) => {
        this.shopData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
