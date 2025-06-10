import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ShopService } from '../../core/services/shop.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { IProduct } from '../../core/interfeces/i-product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ShopService: ShopService,
    private _FavoritesService: FavoritesService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  private _PLATFORM_ID = inject(PLATFORM_ID);

  productId!: string | null;
  productDetails!: IProduct;
  productSub!: Subscription;
  cartSub!: Subscription;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (productInfo) => {
        this.productId = productInfo.get('p_ID');
        this.productSub = this._ShopService
          .getSpecificProduct(this.productId)
          .subscribe({
            next: (res) => {
              this.productDetails = res;
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
    });
  }

  addProductToCart(p_ID: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('userToken')) {
        this.cartSub = this._CartService.addProductToCart(p_ID).subscribe({
          next: (res) => {
            this._CartService.cartCounter.next(res.counter);
            this._ToastrService.success(res.message, 'Greenly', {
              timeOut: 2000,
              closeButton: true,
            });
          },
          error: (err) => {
            this._ToastrService.success(err.error.message, 'Greenly', {
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

  addProductToFavorites(productID: string): void {
    this._FavoritesService.addProductToFavorites(productID).subscribe({
      next: (res) => {
        this._ToastrService.success('Added To Favorites', 'Greenly');
      },
      error: (err) => {
        this._ToastrService.info('Already in Favorites', 'Greenly');
      },
    });
  }

  shareProductLink(): void {
    if (!isPlatformBrowser(this._PLATFORM_ID)) return;

    const currentUrl = `${window.location.origin}/app/system/product-details/${this.productDetails._id}`;

    navigator.clipboard.writeText(currentUrl).then(() => {
      this._ToastrService.info('Product link copied to clipboard', 'Success!');
    }).catch((err) => {
      console.error('Could not copy text: ', err);
      this._ToastrService.error('Failed to copy link', 'Error', {
        timeOut: 2000,
        progressBar: true,
        toastClass: 'toast-error'
      });
    });
  }

  productSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 },
    },
    nav: false,
  };
}