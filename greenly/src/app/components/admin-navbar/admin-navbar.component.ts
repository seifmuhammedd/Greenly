import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  public readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  logOut(): void {
    localStorage.removeItem('userToken');
    this._AuthService.isLoggedIn.set(false);
    this._Router.navigate(['/app/system/login']);
  }
}
