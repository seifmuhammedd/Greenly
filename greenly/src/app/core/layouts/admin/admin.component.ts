import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../../components/admin-navbar/admin-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
