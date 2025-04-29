import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { Subscription } from 'rxjs';
import { IShop } from '../../core/interfeces/i-shop';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfeces/i-category';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {

  constructor(
    private _ShopService: ShopService,
    private _CategoriesService: CategoriesService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
  ) {}

    private _PLATFORM_ID = inject(PLATFORM_ID);
  

  shopData!: IShop;
  categoriesData!: ICategory[];
  productsSub!: Subscription;
  categoriesSub!: Subscription;
  cartSub!: Subscription;

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

  addProductToCart(p_ID: string): void {
      if (isPlatformBrowser(this._PLATFORM_ID)) {
        if (localStorage.getItem('userToken')) {
          this.cartSub = this._CartService.addProductToCart(p_ID).subscribe({
            next: (res) => {
              this._ToastrService.success(res.message, 'Greenly', {
                timeOut: 2000,
                closeButton: true,
              });
            },
            error: (err) => {
              this._ToastrService.error(err.error.message, 'Greenly', {
                timeOut: 2000,
                closeButton: true,
              });
            },
          });
        } else {
          this._ToastrService.error('Please LogIn First', 'Greenly', {
            timeOut: 2000,
            closeButton: true,
          });
        }
      }
    }
}
