import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router)
  public readonly _AuthService = inject(AuthService)

  logOut():void{
    localStorage.removeItem("userToken")
    this._AuthService.isLoggedIn.set(false)
    this._Router.navigate(["/login"])
  }

}
