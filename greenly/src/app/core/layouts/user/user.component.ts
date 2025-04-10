import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
