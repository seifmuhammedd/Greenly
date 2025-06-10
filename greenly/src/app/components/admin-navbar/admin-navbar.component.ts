import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  public readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  logOut(): void {
    localStorage.clear()
    this._AuthService.isLoggedIn.set(false);
    this._Router.navigate(['/app/system/login']);
  }

}
