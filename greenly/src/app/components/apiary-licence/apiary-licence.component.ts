import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LicenceService } from '../../core/services/licence.service';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apiary-licence',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './apiary-licence.component.html',
  styleUrls: ['./apiary-licence.component.css'],
})
export class ApiaryLicenceComponent implements OnInit {
  charactersLeft: number = 3000;

  apiaryForm: FormGroup = this._FormBuilder.group({
    fullName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required,Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]],
    email: [null, [Validators.required, Validators.email]],
    address: [null, [Validators.required]],
    experience: [null, [Validators.required, Validators.min(0)]],
    requiredArea: [null, [Validators.required, Validators.min(1)]],
    requiredLocation: [null, [Validators.required]],
    plantsType: ['Select plant type', [Validators.required]],
    numberOfColonies: [null, [Validators.required, Validators.min(1)]],
    workPlan: [null, [Validators.required, Validators.maxLength(3000)]],
    nationalId: [null, [Validators.required]],
    documents: [null, [Validators.required]],
  });

  constructor(
    private _FormBuilder: FormBuilder,
    private _LicenceService: LicenceService
  ) {}

  ngOnInit(): void {
    this.apiaryForm.get('workPlan')?.valueChanges.subscribe((value) => {
      const maxCharacters = 3000;
      this.charactersLeft = maxCharacters - (value?.length || 0);
    });
  }

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
      formData.append(
        'requiredArea',
        this.apiaryForm.get('requiredArea')?.value
      );
      formData.append(
        'requiredLocation',
        this.apiaryForm.get('requiredLocation')?.value
      );
      formData.append('plantsType', this.apiaryForm.get('plantsType')?.value);
      formData.append(
        'numberOfColonies',
        this.apiaryForm.get('numberOfColonies')?.value
      );
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
        next: (res) => {
          console.log(res);
          this.showSuccessAlert(); // Show success message
          this.apiaryForm.reset(); // Reset the form
        },
        error: (err) => {
          console.error(err);
          this.showErrorAlert(); // Show error message
        },
      });
    } else {
      this.apiaryForm.markAllAsTouched();
    }
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Your request has been submitted successfully. We will contact you through email as soon as possible.',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-success',
      },
    });
  }

  showErrorAlert() {
    Swal.fire({
      title: 'Canceled!',
      text: 'You can only submit one request every 30 days.',
      icon: 'error',
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    });
  }
}