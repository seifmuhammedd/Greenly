import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apiary-licence',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apiary-licence.component.html',
  styleUrl: './apiary-licence.component.css',
})
export class ApiaryLicenceComponent {
  workPlanText: string = '';
  charactersLeft: number = 1500;

  countCharacters() {
    const maxCharacters = 1500;
    this.charactersLeft = maxCharacters - (this.workPlanText?.length || 0);
  }
}
