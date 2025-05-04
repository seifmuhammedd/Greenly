import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ShopService } from '../../core/services/shop.service';
import { IProduct } from '../../core/interfeces/i-product';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ShopService: ShopService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
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
              console.log(res)
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
            this._CartService.cartCounter.next(res.counter)
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

  productSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
}
