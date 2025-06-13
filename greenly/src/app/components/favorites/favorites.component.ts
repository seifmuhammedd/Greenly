import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { Subscription } from 'rxjs';
import { IFavorites } from '../../core/interfeces/i-favorites';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  constructor( private _FavoritesService: FavoritesService, private _ToastrService: ToastrService, private _CartService: CartService ) { }

  wishListSub !: Subscription
  favoritesData !: IFavorites

  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  ngOnInit(): void {
    this._FavoritesService.getWishList().subscribe({
      next: (res)=>{
        this.favoritesData = res.wishlist
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

  deleteFromFavorites(p_id: string):void{
    this._FavoritesService.removeProductFromFavorites(p_id).subscribe({
      next: (res)=>{
        this.favoritesData=res.wishlist
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

  addProductToCart(p_ID: string): void {
      if (isPlatformBrowser(this._PLATFORM_ID)) {
        if (localStorage.getItem('userToken')) {
          this._CartService.addProductToCart(p_ID).subscribe({
            next: (res) => {
              this._CartService.cartCounter.next(res.counter);
              this._ToastrService.success(
                'Added to cart successfully',
                'Greenly',
                {
                  timeOut: 2000,
                  closeButton: true,
                }
              );
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
