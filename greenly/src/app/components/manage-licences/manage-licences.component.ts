import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../core/services/licence.service';
import { ILicence } from '../../core/interfeces/i-licence';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-licences',
  standalone: true,
  imports: [DatePipe,RouterLink],
  templateUrl: './manage-licences.component.html',
  styleUrl: './manage-licences.component.css'
})
export class ManageLicencesComponent implements OnInit {

  constructor(private _LicenceService: LicenceService) { }

  licencesData !: ILicence[]

  ngOnInit(): void {
    this._LicenceService.getAllRequests().subscribe({
      next: (res) => {
        this.licencesData = res;
      },
      error: (err) => {
        console.error('Error fetching licence requests:', err);
      }
    });
  }

}
