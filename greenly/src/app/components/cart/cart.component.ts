import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfeces/i-cart';
import { Subscription } from 'rxjs';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  cartData!: ICart;
  cartSub!: Subscription;

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.cartSub = this._CartService.getUserCart().subscribe({
          next: (res) => {
            console.log(res)
            this._CartService.cartCounter.next(res.counter);
            this.cartData = res;
          },
          error: (err) => console.log(err),
        });
      } else {
        console.warn('Token not found yet. Cart request skipped.');
      }
    }
  }

  removeProductFromCart(p_ID: string): void {
    this._CartService.removeItemFromCart(p_ID).subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.counter);
        this._ToastrService.success('Product Removed Successfully', 'Greenly', {
          timeOut: 1000,
          closeButton: true,
        });
        this.cartData = res;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  updateItemQuantity(p_ID: string, count: number): void {
    if (count > 0) {
      this._CartService.updateItemCartQuantity(p_ID, count).subscribe({
        next: (res) => {
          this._CartService.cartCounter.next(res.counter);
          this.cartData = res;
          this._ToastrService.success('Quantity Updated', 'Greenly', {
            timeOut: 1000,
          });
        },
        error: (err) => {
          this._ToastrService.error(`${err.error.message}`)
          console.log(err.error.message);
        },
      });
    }
  }

  emptyCart(): void {
    this._CartService.emptyUserCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.counter);
        this.cartData = res;
        this._ToastrService.success('Quantity Updated', 'Greenly', {
          timeOut: 1000,
        });
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

}
