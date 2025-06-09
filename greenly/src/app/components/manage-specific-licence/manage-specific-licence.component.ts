import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../core/services/licence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILicence } from '../../core/interfeces/i-licence';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-specific-licence',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-specific-licence.component.html',
  styleUrl: './manage-specific-licence.component.css'
})
export class ManageSpecificLicenceComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _LicenceService: LicenceService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  licenceDetails!: ILicence;
  licenceID!: string | null;
  apiaryForm!: FormGroup;

  ngOnInit(): void {
    this.initializeEmptyForm();

    this._ActivatedRoute.paramMap.subscribe({
      next: (licenceInfo) => {
        this.licenceID = licenceInfo.get('l_ID');
        if (this.licenceID) {
          this._LicenceService.getSpecificLicence(this.licenceID).subscribe({
            next: (res) => {
              this.licenceDetails = res;
              this.updateFormWithData();
            },
            error: (err) => {
              console.log(err);
              this._ToastrService.error('Failed to load licence details');
            }
          });
        }
      }
    });
  }

  private initializeEmptyForm(): void {
    this.apiaryForm = this._FormBuilder.group({
      fullName: [''],
      phoneNumber: [''],
      email: [''],
      address: [''],
      experience: [''],
      requiredArea: [''],
      requiredLocation: [''],
      plantsType: [''],
      numberOfColonies: [''],
      workPlan: [''],
      nationalId: [null],
      documents: [null]
    });
  }

  private updateFormWithData(): void {
    if (this.licenceDetails) {
      this.apiaryForm.patchValue({
        fullName: this.licenceDetails.fullName,
        phoneNumber: this.licenceDetails.phoneNumber,
        email: this.licenceDetails.email,
        address: this.licenceDetails.address,
        experience: this.licenceDetails.experience,
        requiredArea: this.licenceDetails.requiredArea,
        requiredLocation: this.licenceDetails.requiredLocation,
        plantsType: this.licenceDetails.plantsType,
        numberOfColonies: this.licenceDetails.numberOfColonies,
        workPlan: this.licenceDetails.workPlan
      });
    }
  }

  updateLicenceStatus(licenceID: string | null, status: string):void{
    this._LicenceService.updateLicenceStatus(licenceID, status).subscribe({
      next: (res) => {
        this._ToastrService.success(`Licence status updated to ${status}`);
        this._Router.navigate(['/admin/manage-licences']);
      },
      error: (err) => {
        console.error(err);
        this._ToastrService.error('Failed to update licence status');
      }
    });
  }
}