import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LicenceService } from '../../core/services/licence.service';

@Component({
  selector: 'app-apiary-licence',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './apiary-licence.component.html',
  styleUrl: './apiary-licence.component.css',
})
export class ApiaryLicenceComponent {

  constructor ( private _FormBuilder: FormBuilder, private _LicenceService: LicenceService ) { }

  workPlanText: string = '';
  charactersLeft: number = 1500;

  countCharacters() {
    const maxCharacters = 1500;
    this.charactersLeft = maxCharacters - (this.workPlanText?.length || 0);
  }

  apiaryForm: FormGroup = this._FormBuilder.group({
      fullName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      experience: [null, [Validators.required, Validators.min(0)]],

      requiredArea: [null, [Validators.required, Validators.min(1)]],
      requiredLocation: [null, [Validators.required]],
      plantsType: ["Select plant type", [Validators.required]],
      numberOfColonies: [null, [Validators.required, Validators.min(1)]],
      workPlan: [null, [Validators.required, Validators.maxLength(1500)]],

      nationalId: [null, [Validators.required]],
      documents: [null, [Validators.required]]
  })
  

  onFileChange(event: Event, controlName: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.apiaryForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.apiaryForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.apiaryForm.get('fullName')?.value);
      formData.append('phoneNumber', this.apiaryForm.get('phoneNumber')?.value);
      formData.append('email', this.apiaryForm.get('email')?.value);
      formData.append('address', this.apiaryForm.get('address')?.value);
      formData.append('experience', this.apiaryForm.get('experience')?.value);
      formData.append('requiredArea', this.apiaryForm.get('requiredArea')?.value);
      formData.append('requiredLocation', this.apiaryForm.get('requiredLocation')?.value);
      formData.append('plantsType', this.apiaryForm.get('plantsType')?.value);
      formData.append('numberOfColonies', this.apiaryForm.get('numberOfColonies')?.value);
      formData.append('workPlan', this.apiaryForm.get('workPlan')?.value);
      const nationalIdFile = this.apiaryForm.get('nationalId')?.value;
      if (nationalIdFile) {
        formData.append('nationalId', nationalIdFile);
      }
  
      const documentsFile = this.apiaryForm.get('documents')?.value;
      if (documentsFile) {
        formData.append('documents', documentsFile);
      }
      
      this._LicenceService.requestLicence(formData).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err)
      });
    } else {
      this.apiaryForm.markAllAsTouched();
    }
  }
  


}
