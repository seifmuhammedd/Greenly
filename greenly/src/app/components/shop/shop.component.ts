import { Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { Subscription } from 'rxjs';
import { IShop } from '../../core/interfeces/i-shop';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfeces/i-category';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { IFavorites } from '../../core/interfeces/i-favorites';

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
    private _FavoritesService: FavoritesService,
    private _ToastrService: ToastrService
  ) {}

  private _PLATFORM_ID = inject(PLATFORM_ID);

  shopData!: IShop;
  categoriesData!: ICategory[];
  favoritesData !: IFavorites

  productsSub!: Subscription;
  categoriesSub!: Subscription;
  cartSub!: Subscription;
  favoritesSub!: Subscription;
  addfavoritesSub!: Subscription;
  removefavoritesSub!: Subscription;

  ngOnInit(): void {
    this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.productsSub = this._ShopService
      .getProductsByCategory('680f9db0a65c13f4c7fb9a0c')
      .subscribe({
        next: (res) => {
          this.shopData = res;
        },
        error: (err) => {
          console.log(err);
        },
      });

      this.favoritesSub = this._FavoritesService.getWishList().subscribe({
        next: (res)=>{
          console.log(res)
          this.favoritesData = res.wishlist
        },
        error: (err)=>{
          console.log(err)
        }
      }) 
  }

  getProductsByCategory(p_ID: string): void {
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
            this._CartService.cartCounter.next(res.counter) 
            this._ToastrService.success("Added to cart successfully", 'Greenly', {
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

  refreshFavoritesList():void{
    this._FavoritesService.getWishList().subscribe({
      next: (res)=>{
        this.favoritesData = res.wishlist
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  addProductToFavorites(p_ID: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('userToken')) {
        this.addfavoritesSub = this._FavoritesService.addProductToFavorites(p_ID).subscribe({
          next: (res) => {
            console.log(res)
            this.refreshFavoritesList()
            this._ToastrService.success(res.message, 'Greenly', {
              timeOut: 2000,
              closeButton: true,
            });
          },
        });
      } else {
        this._ToastrService.error('Please LogIn First', 'Greenly', {
          timeOut: 1000,
          closeButton: true,
        });
      }
    }
  }

  removeProductFromFavorites(p_ID: string):void{
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(localStorage.getItem("userToken")){
        this.removefavoritesSub = this._FavoritesService.removeProductFromFavorites(p_ID).subscribe({
          next: (res)=>{
            console.log(res)
            this.refreshFavoritesList()
            this._ToastrService.info("Product removed successfully", "Greenly", {timeOut: 1000})
          }
        })
      }else{
        this._ToastrService.error('Please LogIn First', 'Greenly', {
          timeOut: 2000,
          closeButton: true,
        });
      }
    }
  }

  toggleProductFavorites(p_ID: string): void {
    // debugger
    const isInFavorites = this.favoritesData?.products.some(
      (fav) => fav.productId._id === p_ID
    );
  
    if (isInFavorites) {
      this.removeProductFromFavorites(p_ID);
    } else {
      this.addProductToFavorites(p_ID);
    }
  }

  

}