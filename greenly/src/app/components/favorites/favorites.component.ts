import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { Subscription } from 'rxjs';
import { IFavorites } from '../../core/interfeces/i-favorites';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  constructor( private _FavoritesService: FavoritesService, private _ToastrService: ToastrService ) { }

  wishListSub !: Subscription

  favoritesData !: IFavorites

  ngOnInit(): void {
    this._FavoritesService.getWishList().subscribe({
      next: (res)=>{
        this.favoritesData = res.wishlist
        console.log(this.favoritesData)
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

  deleteFromFavorites(p_id: string):void{
    this._FavoritesService.removeProductFromFavorites(p_id).subscribe({
      next: (res)=>{
        window.location.reload()        
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

}
