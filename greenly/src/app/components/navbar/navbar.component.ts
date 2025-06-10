import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit , OnDestroy {
  
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router)
  public readonly _AuthService = inject(AuthService)
  public readonly _CartService = inject(CartService)

  cartCounter !: number 
  counterSub !: Subscription
  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(localStorage.getItem("userToken")){
        this._CartService.getUserCart().subscribe({
          next : (res) => {
            this.cartCounter = res.counter
          }
        })
      }
    }

    this.counterSub =  this._CartService.cartCounter.subscribe({
      next: (value) => this.cartCounter = value
    })
    
  }

  logOut():void{
    localStorage.clear()
    this._AuthService.isLoggedIn.set(false)
    this._Router.navigate(["/app/system/login"])
  }

  ngOnDestroy(): void {
    this.counterSub?.unsubscribe()
  }

}
