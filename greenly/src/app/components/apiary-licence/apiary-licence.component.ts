import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-apiary-licence',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './apiary-licence.component.html',
  styleUrl: './apiary-licence.component.css',
})
export class ApiaryLicenceComponent {

  constructor ( private _FormBuilder: FormBuilder ) { }

  workPlanText: string = '';
  charactersLeft: number = 1500;

  countCharacters() {
    const maxCharacters = 1500;
    this.charactersLeft = maxCharacters - (this.workPlanText?.length || 0);
  }

  apiaryForm: FormGroup = this._FormBuilder.group({
    fullName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      experience: [null, [Validators.required, Validators.min(0)]],

      requiredArea: [null, [Validators.required, Validators.min(1)]],
      requiredLocation: [null, [Validators.required]],
      plants: ["Select plant type", [Validators.required]],
      beeColonies: [null, [Validators.required, Validators.min(1)]],
      workPlan: [null, [Validators.required, Validators.maxLength(1500)]],

      nationalID: [null, [Validators.required]],
      experienceDocs: [null, [Validators.required]]
  })
  

  onFileChange(event: Event, controlName: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.apiaryForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.apiaryForm.valid) {
      console.log(this.apiaryForm.value);
    } else {
      this.apiaryForm.markAllAsTouched();
    }
  }


}
