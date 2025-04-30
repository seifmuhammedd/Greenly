import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  constructor( private _FavoritesService: FavoritesService ) { }

  wishListSub !: Subscription

  ngOnInit(): void {
    this._FavoritesService.getWishList().subscribe({
      next: (res)=>{
        console.log(res)
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

}
