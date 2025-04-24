import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './layout-app.component.html',
  styleUrl: './layout-app.component.css'
})
export class LayoutAppComponent {

}
