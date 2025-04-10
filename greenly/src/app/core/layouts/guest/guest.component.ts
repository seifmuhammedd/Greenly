import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

}
